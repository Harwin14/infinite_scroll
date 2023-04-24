import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [limit, setLimit] = useState(20);
    const [tempId, setTempId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getUsers();
    }, [lastId, keyword]);

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&lastId=${lastId}&limit=${limit}`
        );
        console.log(response);
        const newUsers = response.data.result;
        setUsers([...users, ...newUsers]);
        setTempId(response.data.lastId);
        setHasMore(response.data.hasMore);
    };

    const fetchMore = () => { 
        console.log('wkwkwk'); //belum
        setLastId(tempId);   
    };
    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Find something here..."
                                />
                            </div>
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-info"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <InfiniteScroll
                        dataLength={users.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        <table className="table is-striped is-bordered is-fullwidth mt-2">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{user.id}</th>
                                        <th>{user.name}</th>
                                        <th>{user.email}</th>
                                        <th>{user.gender}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default UserList;
