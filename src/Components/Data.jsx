import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../CSS/Data.css";
import arrows from "../assets/arrows.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Data = () => {
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "athlete", filter: "agTextColumnFilter", tooltipField: "country" },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "country", filter: "agTextColumnFilter" },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateParts = cellValue.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
      },
    },
  ]);

  useEffect(() => {
    axios
      .get("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((res) => {
        setRowData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      filterParams: {
        debounceMs: 200,
      },
      flex: 1,
      minWidth: 100,
      resizable: true,
    }),
    []
  );

  return (
    <main className="data-logs">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center data-title">Data Logs</h1>
          </div>
        </div>
        <div className="data-logs-body">
          <div className="mb-3 row">
            <label
              htmlFor="staticEmail"
              className="col-sm-2 col-form-label data-label"
            >
              Company
            </label>
            <div className="col-sm-10">
              <select
                className="form-select data-select"
                aria-label="Default select example"
              >
                <option selected>Company 1</option>
                <option value="1">Company 2</option>
                <option value="2">Company 3</option>
                <option value="3">Company 4</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="staticEmail"
              className="col-sm-2 col-form-label data-label"
            >
              Machine
            </label>
            <div className="col-sm-10">
              <select
                className="form-select data-select"
                aria-label="Default select example"
              >
                <option selected>Machine 1</option>
                <option value="1">Machine 2</option>
                <option value="2">Machine 3</option>
                <option value="3">Machine 4</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-lg-5 col-md-4 col-sm-2">
              <div>
                <label htmlFor="fromDate" className="data-label">
                  From Date
                </label>
                <div>
                  <Calendar id="fromDate" className="calendar" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-1">
              <div className="d-flex justify-content-center align-items-center">
                <img src={arrows} alt="arrows" className="arrows" />
              </div>
            </div>
            <div className="col-lg-5 col-md-4 col-sm-1">
              <div>
                <label htmlFor="toDate" className="data-label">
                  To Date
                </label>
                <div>
                  <Calendar id="toDate" className="calendar" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 row justify-content-center">
            <div className="col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-center">
              <button
                className="btn btn-primary px-4 py-1 rounded-pill btn-datas"
                type="button"
              >
                Show Datas
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3 row mt-5">
          <div
            className="ag-theme-alpine"
            style={{
              height: "800px",
              width: "100%",
            }}
          >
            <AgGridReact
              popupParent={document.body}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={false}
              paginationAutoPageSize={false}
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Data;