import React from "react";
import { Heading } from "grommet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Column, { Spacer } from "../components/Column";
import { HighlightPost, MediumPost, PressArticle } from "../components/News";

import { lastInArray } from "../helpers";
import RichTextRenderer from "../helpers/richTextRenderer";

import medium from "../images/medium-wordmark.svg";

const MediumWordmark = () => (
  <img style={{ width: 98 }} alt="Medium Wordmark" src={medium} />
);

const NewsPage = ({ data }) => {
  const page = data.allContentfulPageNews.edges[0].node;

  const mediumPosts = data.allMediumPost.edges;
  const highlightPost = data.allMediumPost.edges[0].node;

  return (
    <Layout>
      <SEO {...page.seo} />
      <Container>
        <Grid mb="medium">
          <Column>
            <h1 hidden>News</h1>
            <MediumWordmark />
          </Column>
        </Grid>

        <HighlightPost post={highlightPost} />

        <Grid align="start">
          {mediumPosts.map((post, index) => {
            if (index === 0) return null;

            return (
              <>
                <Column span={{ medium: 4, large: 3 }}>
                  <MediumPost post={post} />
                </Column>
                {!lastInArray(mediumPosts, index) && <Spacer />}
              </>
            );
          })}
        </Grid>

        <Grid mb="" justify="">
          <Column span={{ medium: 6, large: 4 }}>
            <Heading lined level="2">
              Press about Centrifuge
            </Heading>
          </Column>
        </Grid>

        <Grid mt="" align="start">
          {page.blockPress.map((article, index) => (
            <Column key={index} span={{ medium: 6, large: 6 }}>
              <PressArticle article={article} />
            </Column>
          ))}
        </Grid>

        <Grid justify="center">
          <Column textAlign="center" style={{ fontSize: 18 }}>
            <RichTextRenderer block={page.blockMediaInquiry} />
          </Column>
        </Grid>
      </Container>
    </Layout>
  );
};

export const NewsPageQuery = graphql`
  query {
    allContentfulPageNews {
      edges {
        node {
          seo {
            title
          }
          blockPress {
            agency {
              name
              logo {
                file {
                  url
                  fileName
                }
              }
            }
            articleTitle
            articleSummary {
              articleSummary
            }
            articleLink
          }
          blockMediaInquiry {
            contentAST
          }
        }
      }
    }
    allMediumPost(limit: 4, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          title
          uniqueSlug
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
        }
      }
    }
  }
`;

export default NewsPage;
