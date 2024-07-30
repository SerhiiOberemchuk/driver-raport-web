import Container from "@/components/container";
import PageRegister from "@/components/PageRegister";
import React from "react";

type Props = {};

function PageLogIn({}: Props) {
  return (
    <Container>
      <div>
        <h1
          style={{
            marginBottom: 50,
          }}
        >
          PageLogIn
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <PageRegister />
        </div>
      </div>
      {/* <p>Welcome {session?.user.name}!</p> */}
    </Container>
  );
}

export default PageLogIn;
