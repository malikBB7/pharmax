import React, { useState } from 'react';
import { getAccessToken } from '../utils/auth'; // Adjust the path if necessary
import './QualityControlPage.css'; // Ensure your styles are applied

const QualityControlPage = () => {
    const [showTable, setShowTable] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ name: '', salary: '' });

    const fetchDataFromAPI = async () => {
        const accessTokenResponse = await getAccessToken();
        const accessToken = accessTokenResponse.access_token;
        const endpoint = `https://graph.microsoft.com/v1.0/sites/${process.env.REACT_APP_SITE_ID}/lists/${process.env.REACT_APP_QUALITY_CONTROL_LIST_ID}/items?$expand=fields($select=ID,Name,Salary,Date)`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access - please check your access token.');
                }
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            return data.value || [];
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    };

    const handleFetchDataClick = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDataFromAPI();
            console.log(data); // Log to check field names, including ID
            setApiData(data);
            setShowTable(true);
        } catch (error) {
            setError('Failed to fetch data from API');
        } finally {
            setLoading(false);
        }
    };
    

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredData = apiData.filter((item) => {
        const fields = item.fields || {};
        const nameMatch = fields.Name ? fields.Name.toLowerCase().includes(filters.name.toLowerCase()) : true;
        const salaryMatch = fields.Salary ? fields.Salary.toString().includes(filters.salary) : true;
        return nameMatch && salaryMatch;
    });

    return (
        <div className="quality-control-page">
            <h1>Quality Control</h1>
            <button className="get-data-button" onClick={handleFetchDataClick}>Fetch Data</button>
            <div className="filter-options-container">
                <div className="filter-options">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        Salary:
                        <input
                            type="text"
                            name="salary"
                            value={filters.salary}
                            onChange={handleFilterChange}
                        />
                    </label>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {showTable && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
    {filteredData.map((item, index) => {
        const fields = item.fields || {};
        return (
            <tr key={`${item.id}-${index}`}>
                <td>{item.id || 'N/A'}</td>
                <td>{fields.Name}</td>
                <td>{fields.Salary}</td>
                <td>{fields.Date ? new Date(fields.Date).toLocaleDateString() : 'N/A'}</td>
            </tr>
        );
    })}
</tbody>



    


                </table>
            )}
        </div>
    );
};

export default QualityControlPage;
