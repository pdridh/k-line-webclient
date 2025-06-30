import { useEffect, useState } from "react";
import { MENU_URL, TABLE_URL } from "../config";

function TablesBoard({ tables, selectTable }) {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">Tables</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            className={`p-4 rounded-xl border font-medium shadow-sm transition
                    ${
                        table.status === "occupied"
                            ? "text-red-600 border-red-300 hover:bg-red-50"
                            : "text-green-600 border-green-300 hover:bg-green-50"
                    }`}
                            onClick={() => selectTable(table.id)}
                        >
                            Table {table.id}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TableHandler({ table, selectTable }) {
    return (
        <div>
            <button onClick={() => selectTable(null)}>Back</button>
            <h1>For table {table}</h1>
        </div>
    );
}

export default function Waiter() {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`${TABLE_URL}?status=available`, {
                credentials: "include",
            }).then((res) => res.json()),
            fetch(`${TABLE_URL}?status=occupied`, {
                credentials: "include",
            }).then((res) => res.json()),
        ]).then(([availableData, occupiedData]) => {
            const allTables = [...availableData.data, ...occupiedData.data];
            setTables(allTables);
        });
    }, []);

    function selectTable(id) {
        setSelectedTable(id);
    }

    return (
        <>
            {selectedTable == null ? (
                <TablesBoard tables={tables} selectTable={selectTable} />
            ) : (
                <TableHandler table={selectedTable} selectTable={selectTable} />
            )}
        </>
    );
}
