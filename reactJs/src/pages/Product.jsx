import { useEffect, useState } from "react";
import { httpRequest } from "../axios-client";

import { PiEyeBold, PiPencilLineThin, PiTrashThin } from "react-icons/pi";

export default function Product() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        httpRequest.get("/products").then(({ data }) => {
            setLoading(false);
            setProducts(data.data);
        });
    };

    useEffect(() => {
        setLoading(true);
        getProducts();
    }, []);

    return (
        <>
            {loading && <span>Loading...</span>}
            {!loading && (
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.thumbnail}</td>
                                    <td>{p.created_at}</td>
                                    <td>
                                        <button className="btn btn-sm fs-6 text-info">
                                            <PiEyeBold />
                                        </button>
                                        <button className="btn btn-sm fs-6 text-warning">
                                            <PiPencilLineThin />
                                        </button>
                                        <button className="btn btn-sm fs-6 text-danger">
                                            <PiTrashThin />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
