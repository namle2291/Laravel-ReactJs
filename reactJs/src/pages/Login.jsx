import { Link } from "react-router-dom";
import { httpRequest } from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const { setToken, setUser, toast } = useStateContext();

    const handleLogin = (e) => {
        e.preventDefault();

        const payload = new FormData();

        payload.append("email", e.target[0].value);
        payload.append("password", e.target[1].value);

        httpRequest
            .post("/login", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch(({ response }) => {
                const { errors } = response.data;
                for (let e in errors) {
                    toast.warn(errors[e][0]);
                    break;
                }
            });
    };
    return (
        <div
            className="row m-0"
            style={{ height: "100vh", boxSizing: "border-box" }}
        >
            <div className="col-4 shadow rounded-2 m-auto py-3">
                <h4 className="text-center mb-4">Login</h4>
                <form onSubmit={handleLogin}>
                    <label className="form-label">Email</label>
                    <div className="form-group mb-3">
                        <input type="email" className="form-control border" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control border"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                    >
                        Sign in
                    </button>
                    <Link to="/sign-up">Sign-up</Link>
                </form>
            </div>
        </div>
    );
}
