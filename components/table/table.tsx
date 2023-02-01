export interface Headers {
  header: string
  accessor: number
}

interface TableProps {
  headers?: Headers[]
  data: any[]
}

export const Table = ({ headers, data }: TableProps) => {
  return (
    <table className="w-full border border-white/30">
      <thead className="uppercase">
        <tr>
          {headers
            ? headers?.map((header, index) => {
                return (
                  <th key={index} className="p-2 border border-white/30">
                    {header.header}
                  </th>
                )
              })
            : Object.keys(data[0]).map((key) => (
                <th className="p-2 border border-white/30" key={key}>
                  {key}
                </th>
              ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell: any, cellIndex) => (
              <td className="p-2 border border-white/30" key={cellIndex}>
                {typeof cell === "object" ? JSON.stringify(cell) : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
