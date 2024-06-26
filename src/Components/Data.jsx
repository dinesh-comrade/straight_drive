import { useState, useMemo } from "react";
import "../CSS/Data.css";
import arrows from "../assets/arrows.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAuth } from "../Context/AuthContext";
import { format } from "date-fns";

const Data = () => {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    CustomInput,
    rowData,
    clientData,
    machineData,
    handleClientID,
    handleMachineID,
    handleDataGrid,
    clientID,
  } = useAuth();

  console.log("Client ID: ", clientID);
  console.log("Client Data in Data.jsx:", clientData);
  const [colDefs] = useState([
    {
      field: "machineId",
    },
    {
      field: "date",
    },
    { field: "totalOvers" },
    { field: "totalPlayers" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      suppressMovable: true,
      // sortable: true,
      // floatingFilter: true,
      // filterParams: {
      //   debounceMs: 200,
      // },
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
            <h1 className="text-center data-title">Game Log</h1>
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
                onChange={handleClientID}
              >
                <option value={0}>Select Company</option>
                {clientData?.map((client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.clientName}
                    </option>
                  );
                })}
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
                onChange={handleMachineID}
              >
                <option value="">Select Machine</option>
                {machineData?.map((machine) => {
                  return (
                    <option key={machine.id} value={machine.machineId}>
                      {machine.machineId}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-lg-5 col-md-4 col-sm-2">
              <div className="Date-container fromDate-container">
                <label htmlFor="fromDate" className="date-label">
                  From Date
                </label>
                <DatePicker
                  id="fromDate"
                  selected={fromDate}
                  onChange={(date) => setFromDate(format(date, "yyyy-MM-dd"))}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-1">
              <div className="d-flex justify-content-center align-items-center">
                <img src={arrows} alt="arrows" className="arrows" />
              </div>
            </div>
            <div className="col-lg-5 col-md-4 col-sm-1">
              <div className="Date-container">
                <label htmlFor="toDate" className="date-label to-label">
                  To Date
                </label>
                <DatePicker
                  id="toDate"
                  selected={toDate}
                  onChange={(date) => setToDate(format(date, "yyyy-MM-dd"))}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </div>
            </div>
          </div>
          <div className="mb-3 row justify-content-center">
            <div className="col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-center">
              <button
                className="btn btn-primary px-4 py-1 rounded-pill btn-datas"
                type="button"
                onClick={handleDataGrid}
              >
                Show Data
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3 row mt-5">
          <div className="ag-theme-alpine">
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
