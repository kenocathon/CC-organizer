import React from 'react';

export default function DataTable({ data, camelCase }) {


  const columns = data[0] && Object.keys(data[0])

  return (
    <table cellPadding={5} cellSpacing={10}>
      <thead>
        <tr>
          {data[0] && columns.map((heading, index) => {
            console.log(heading)
            if(heading !== '_id'){
              return <th key={index}>{camelCase(heading)}</th>
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id + 'tr'}>
            {columns.map((column) => {
              console.log(row)
              if(row[column] !== row._id){
              return <td key={row.id + 'td'}>{row[column]}</td>
              }
              
            }
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
