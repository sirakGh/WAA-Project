import React, { useState, useEffect } from 'react';
import api from '../../../configuration/api'
import MUIDataTable from "mui-datatables";


const AdminSellers = () => {

    const [sellers, setSellers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();



    function fetchSellers() {
        setLoading(true);
        setError(null);
        api.get('sellers')
            .then(function (response) {
                const tempSellers = response.data.filter(s => s.approved === false)
                setSellers(tempSellers)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(fetchSellers, []);

    useEffect(fetchSellers, [refresh]);


    const handleApproveSeller = (id) => {
        api.patch('sellers/' + id + '/approve')
            .then(function (response) {
                console.log("Approved")
                setRefresh(true)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });
    }


    const columns = [
        { name: "id", label: "ID", options: { display: "excluded" } },
        {
            name: "username"
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <> <button onClick={() => {
                        handleApproveSeller(tableMeta.rowData[0])
                        console.log(tableMeta.rowData[0])
                    }}>
                        Approve Seller
                    </button></>;
                },
            }
        },

    ]

    return (
        <MUIDataTable title={"Sellers"} data={sellers} columns={columns} />

    );

}

export default AdminSellers;

