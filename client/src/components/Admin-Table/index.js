import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGroupBy,
  useExpanded,
} from "react-table"; //useGlobalFilter,
import { COLUMNS } from "./columns";
import "./table.css";
import { ColumnFilter } from "./ColumnFilter";
import API from "../../utils/API";
// import { GlobalFilter } from './GlobalFilter'

const AdminTable = () => {

  //***setting up data */

  const [mydata, setMydata] = useState([]);

  useEffect(() => {

    API.getAllTransactions().then(transactions => {
      console.log(transactions.data);
      // console.log(e.data);
      // setMydata(JSON.parse(e));
      // setMydata(JSON.parse(transactions.data));
      setMydata(transactions.data);
      // console.log("this is the goods", mydata);
      return;
    });
  }, [])


  //***setting up data end */

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => mydata, []);



  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  //
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // state: { groupBy, expanded },
    // setGlobalFilter,
    gotoPage,
    pageCount,
    pageIndex,
    pageSize,
    setPageSize,
    // rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    useFilters,
    // useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded, // useGroupBy would be pretty useless without useExpanded ;) -- comment
    usePagination //this order matters for some reason, filters, then sortby, then pagination
  );

  return (
    <>
      {mydata && <>
        {/* <pre>
        <code>{JSON.stringify({ groupBy, expanded }, null, 2)}</code>
      </pre> */}
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {" "}
                    {/*  */}
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>{" "}
                    {/* Filter Options */}
                    <span>
                      {" "}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}{" "}
                    </span>{" "}
                    {/* Sort Options */}
                    {column.canGroupBy ? (
                      <span {...column.getGroupByToggleProps()}>
                        {" "}
                        {column.isGrouped ? "🛑 " : "👊 "}{" "}
                      </span>
                    ) : null}{" "}
                    {/* Group By Options */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>{column.render("Footer")}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>

        {/* PAGINATION OPTIONS HERE */}

        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
        </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
        </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>}
    </>
  );
};


export default AdminTable;
