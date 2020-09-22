const { default: Footer } = require("../components/Footer");
const { default: HeaderApp } = require("../components/Header");

function admin() {
  return (
    <>
      <HeaderApp />
      <h1>admin</h1>

      <Footer />
    </>
  );
}

export default admin;
