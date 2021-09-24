import React, { useState, useEffect } from 'react';
import api from '../../../configuration/api'
import MUIDataTable from "mui-datatables";


const AdminReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();



    function fetchReviews() {
        setLoading(true);
        setError(null);
        api.get('reviews')
            .then(function (response) {
                const tempReviews = response.data.filter(r => r.approved === false)
                setReviews(tempReviews)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(fetchReviews, []);

    useEffect(fetchReviews, [refresh]);


    const handleApproveReview = (id) => {
        api.patch('reviews/' + id + '/approve')
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
            name: "content"
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <> <button onClick={() => {
                        handleApproveReview(tableMeta.rowData[0])
                        console.log(tableMeta.rowData[0])
                    }}>
                        Approve Review
                    </button></>;
                },
            }
        },

    ]

    return (
        
        <MUIDataTable title={"Reviews"} data={reviews} columns={columns} />
  
    );

}

export default AdminReviews;

