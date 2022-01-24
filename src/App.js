import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { parse } from "papaparse";
import { Table, TableContainer, TableRow, TableCell } from "@material-ui/core";
function App() {
  const [contacts, setContacts] = useState([]);
  return (
    <div>
      <h2>
        Drop <span>csv</span> File here
      </h2>
      <div
        className="drag-box"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "application/vnd.ms-excel")
            .forEach(async (files) => {
              const text = await files.text();
              const result = parse(text, { header: true });
              setContacts((existing) => [...existing, ...result.data]);
            });
        }}
        //
      >
        Drop Here
      </div>
      <TableContainer>
        {contacts.map((contact) => {
          return (
            <Table key={contact.email}>
              <TableRow className="style">
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
              </TableRow>
            </Table>
          );
        })}
      </TableContainer>
    </div>
  );
}

export default App;
