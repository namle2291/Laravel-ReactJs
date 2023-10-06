import { useEffect, useState } from "react";
import { httpRequest } from "../../axios-client";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddOrUpdate() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [file, setFile] = useState();
    const [image, setImage] = useState("");

    const { product_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getProduct();
        getCategories();
    }, []);

    useEffect(() => {
        let url = null;
        if (file) {
            url = URL.createObjectURL(file);
            setImage(url);
        }
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    const getProduct = () => {
        httpRequest.get(`/products/${product_id}`).then(({ data }) => {
            setLoading(false);
            setTitle(data.data.title);
            setPrice(data.data.price);
            setDesc(data.data.description);
            setImage(data.data.thumbnail);
            setCategoryId(data.data.category.id);
        });
    };

    const getCategories = () => {
        httpRequest.get("/categories").then(({ data }) => {
            setCategories(data.data);
        });
    };

    const handleSubmit = () => {
        const payload = new FormData();

        payload.append("title", title);
        payload.append("price", Number.parseInt(price));
        payload.append("description", description);
        payload.append("category_id", categoryId);
        payload.append("thumbnail", file);
        payload.append("_method", "PUT");

        console.log(categoryId);

        httpRequest
            .post(`/products/${product_id}`, payload)
            .then(() => {
                navigate("/products");
            })
            .catch((respone) => {
                console.log(respone);
            });
    };

    return (
        <>
            {loading && <span>Loading...</span>}
            {!loading && (
                <div className="row">
                    <div className="col-7">
                        <div className="form-group mb-2">
                            <label className="form-label">Name</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Price</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Category</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="form-select"
                            >
                                {categories &&
                                    categories.map((c) => (
                                        <option
                                            selected={
                                                categoryId == c.id
                                                    ? "selected"
                                                    : ""
                                            }
                                            value={c.id}
                                            key={c.id}
                                        >
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                className="form-control"
                                rows="3"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <Link
                                className="btn btn-sm btn-dark"
                                to="/products"
                            >
                                Back
                            </Link>
                            <button
                                onClick={handleSubmit}
                                className="btn btn-sm btn-success"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <label className="form-label">Thumbnail</label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                className="form-control"
                            />
                        </div>
                        <img src={image} className="mt-3" width={200} alt="" />
                    </div>
                </div>
            )}
        </>
    );
}
