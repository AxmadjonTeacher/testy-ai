
import React from 'react';

const FileFormatGuide: React.FC = () => {
  return (
    <div className="bg-neutral-light p-4 rounded-md border border-neutral-light/50">
      <h3 className="text-sm font-medium mb-2">Required File Format:</h3>
      <p className="text-xs text-neutral-dark mb-2">
        Your file should contain these columns:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-neutral-dark text-white">
            <tr>
              <th className="border border-neutral-light px-2 py-1 text-left">Question</th>
              <th className="border border-neutral-light px-2 py-1 text-center">A</th>
              <th className="border border-neutral-light px-2 py-1 text-center">B</th>
              <th className="border border-neutral-light px-2 py-1 text-center">C</th>
              <th className="border border-neutral-light px-2 py-1 text-center">D</th>
              <th className="border border-neutral-light px-2 py-1 text-center">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-neutral-light px-2 py-1">She ____ to school every day.</td>
              <td className="border border-neutral-light px-2 py-1 text-center">go</td>
              <td className="border border-neutral-light px-2 py-1 text-center">goes</td>
              <td className="border border-neutral-light px-2 py-1 text-center">going</td>
              <td className="border border-neutral-light px-2 py-1 text-center">gone</td>
              <td className="border border-neutral-light px-2 py-1 text-center">B</td>
            </tr>
            <tr>
              <td className="border border-neutral-light px-2 py-1">This is ____ apple.</td>
              <td className="border border-neutral-light px-2 py-1 text-center">a</td>
              <td className="border border-neutral-light px-2 py-1 text-center">an</td>
              <td className="border border-neutral-light px-2 py-1 text-center">the</td>
              <td className="border border-neutral-light px-2 py-1 text-center">no</td>
              <td className="border border-neutral-light px-2 py-1 text-center">B</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileFormatGuide;
