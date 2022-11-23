import React, {ReactElement, useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {getColor} from "../helpers/colorSpeed.helper";

export interface SpeedTableData {
  [p: string]: number[]
}

export interface SpeedTableProps {
  data: SpeedTableData
}

const SpeedTableComponent: React.FC<SpeedTableProps> = ({
                                                          data = {}
                                                        }): ReactElement => {
  const [table, setTable] = useState<SpeedTableData>(data);
  const [columns, setColumns] = useState<string[]>(Object.keys(data));
  useEffect(() => {
    setColumns(Object.keys(table));
  }, [table])
  useEffect(() => {
    setTable(data)
  }, [data])
  return (
    <Table striped bordered hover size="sm">
      <thead>
      <tr>
        <th key="table-speed-lvl" colSpan={0.5}>Level</th>
        {columns.map((column: string) => <th key={`table-speed-${column}`}>{column}</th>)}
      </tr>
      </thead>
      <tbody>
      {columns.length ?
        table[columns[0]].map((_, level) => {
          return (<tr key={`table-speed-${level}`}>
            <td key={`table-speed-data-level-${level}`} colSpan={0.5}>{level + 1}</td>
            {columns.map((column) => {
              return <td style={{background: getColor(table[column][level])}}
                         key={`table-speed-data-${column}-${level}`}>{table[column][level]}</td>
            })}
          </tr>)
        })
        : null}
      </tbody>
    </Table>
  );
};

export default SpeedTableComponent;
