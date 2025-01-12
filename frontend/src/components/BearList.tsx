import React, { useState, useEffect } from 'react';
import { getBearData } from '../services/bearDataService';
import { fetchImageUrl } from '../services/bearImageService';
import type { Bear } from '../models/bear';

const START_INDEX = 1;
const RANGE_DEFAULT = 'Unknown';

const BearList: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const wikitext = await getBearData();
        const bearsData = await extractBears(wikitext);
        setBears(bearsData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const extractBears = async (wikitext: string): Promise<Bear[]> => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears: Bear[] = [];

    for (const table of speciesTables) {
      const rows = table.split('{{Species table/row');

      const bearPromises = rows.map(async (row) => {
        const nameMatch = /\|name=\[\[(.*?)\]\]/.exec(row);
        const binomialMatch = /\|binomial=(.*?)\n/.exec(row);
        const imageMatch = /\|image=(.*?)\n/.exec(row);
        const rangeMatch = /\|range=([^|]*)(?=\s*\()/.exec(row);

        if (
          nameMatch != null &&
          binomialMatch != null &&
          imageMatch != null &&
          rangeMatch != null
        ) {
          const fileName = imageMatch[START_INDEX].trim().replace('File:', '');
          const imageUrl = await fetchImageUrl(fileName);

          const bear: Bear = {
            name: nameMatch[START_INDEX],
            binomial: binomialMatch[START_INDEX],
            image: imageUrl,
            range:
              rangeMatch[START_INDEX] !== ''
                ? rangeMatch[START_INDEX]
                : RANGE_DEFAULT,
          };

          bears.push(bear);
        }
      });

      await Promise.all(bearPromises);
    }

    return bears;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error != null) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="more_bears">
      {bears.map((bear, index) => (
        <div key={index}>
          <h4>
            {bear.name} ({bear.binomial})
          </h4>
          <img
            src={bear.image}
            alt={bear.name}
            style={{ width: '200px', height: 'auto' }}
          />
          <p>
            <strong>Range:</strong> {bear.range}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BearList;
