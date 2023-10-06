import { useEffect, useState } from "react";
import { httpRequest } from "../axios-client";
import { PiEyeBold, PiPencilLineThin, PiTrashThin } from "react-icons/pi";
import { DotLoader } from "react-spinner-overlay";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Product() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const { toast } = useStateContext();

    useEffect(() => {
        setLoading(true);
        getProducts();
    }, []);

    const getProducts = () => {
        httpRequest.get("/products").then(({ data }) => {
            setLoading(false);
            setProducts(data.data);
        });
    };
    const handleDelete = (id) => {
        httpRequest.delete("/products/" + id).then(() => {
            getProducts();
            toast.success("Delete Success!");
        });
    };
    return (
        <>
            <div className="d-flex justify-content-center">
                {loading && <DotLoader loading={loading} />}
            </div>
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
                                    <td>{p.title}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <img
                                            src={p.thumbnail}
                                            width={100}
                                            alt=""
                                        />
                                    </td>
                                    <td>{p.created_at}</td>
                                    <td>
                                        <button className="btn btn-sm fs-6 text-info">
                                            <PiEyeBold />
                                        </button>
                                        <Link
                                            to={`/products/${p.id}`}
                                            className="btn btn-sm fs-6 text-warning"
                                        >
                                            <PiPencilLineThin />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="btn btn-sm fs-6 text-danger"
                                        >
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
