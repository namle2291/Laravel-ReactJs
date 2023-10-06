import { Link } from "react-router-dom";
import { httpRequest } from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function SignUp() {
    const { setUser, setToken, toast } = useStateContext();

    const handleSignup = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", e.target[0].value);
        data.append("email", e.target[1].value);
        data.append("password", e.target[2].value);
        data.append("confirm_password", e.target[3].value);

        httpRequest
            .post("/register", data)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
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
                <h4 className="text-center mb-4">Sign up</h4>
                <form onSubmit={handleSignup}>
                    <label className="form-label">Name</label>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control border"
                        />
                    </div>
                    <label className="form-label">Email</label>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control border"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control border"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            name="confirm_password"
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
                    <Link to="/login">Login</Link>
                </form>
            </div>
        </div>
    );
}
