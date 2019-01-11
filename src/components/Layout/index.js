import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

// import Header from "../Header";
import Footer from "../Footer";
import Navigation from "../Navgation";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Navigation />

        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}

        {children}

        <Footer />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;