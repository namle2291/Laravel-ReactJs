import { useStateContext } from "../contexts/ContextProvider";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon,
} from "mdb-react-ui-kit";

export default function Profile() {
    const { user } = useStateContext();
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <MDBContainer className="h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10">
                            <MDBCard
                                className="mb-3"
                                style={{ borderRadius: ".5rem" }}
                            >
                                <MDBRow className="g-0">
                                    <MDBCol
                                        md="4"
                                        className="gradient-custom text-center text-white"
                                        style={{
                                            borderTopLeftRadius: ".5rem",
                                            borderBottomLeftRadius: ".5rem",
                                        }}
                                    >
                                        <MDBCardImage
                                            src={user.avatar}
                                            alt="Avatar"
                                            className="my-2"
                                            style={{ width: "80px" }}
                                            fluid
                                        />
                                        <MDBTypography
                                            className="text-dark"
                                            tag="h5"
                                        >
                                            {user.name}
                                        </MDBTypography>
                                        <MDBCardText className="text-dark">
                                            Web Developer
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">
                                                Information
                                            </MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol
                                                    size="6"
                                                    className="mb-3"
                                                >
                                                    <MDBTypography tag="h6">
                                                        Email
                                                    </MDBTypography>
                                                    <MDBCardText className="text-muted">
                                                        {user.email}
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol
                                                    size="6"
                                                    className="mb-3"
                                                >
                                                    <MDBTypography tag="h6">
                                                        Phone
                                                    </MDBTypography>
                                                    <MDBCardText className="text-muted">
                                                        {user.phone}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBTypography tag="h6">
                                                Information
                                            </MDBTypography>
                                            <div className="d-flex justify-content-start">
                                                <a href="#!">
                                                    <MDBIcon
                                                        fab
                                                        icon="facebook me-3"
                                                        size="lg"
                                                    />
                                                </a>
                                                <a href="#!">
                                                    <MDBIcon
                                                        fab
                                                        icon="twitter me-3"
                                                        size="lg"
                                                    />
                                                </a>
                                                <a href="#!">
                                                    <MDBIcon
                                                        fab
                                                        icon="instagram me-3"
                                                        size="lg"
                                                    />
                                                </a>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
