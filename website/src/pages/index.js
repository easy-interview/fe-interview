import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {

  const {siteConfig} = useDocusaurusContext();
  const Svg = require('../../static/img/logo.svg').default;
  return (
    <header className={clsx('hero shadow--lw', styles.heroBanner)}>
      <div className="container">
        <Svg height="15em" width="15em" alt="Logo" />
        <h1 className="hero__title">
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle">
          {siteConfig.tagline}
        </p>
        <div className={styles.indexCtas}>
          <Link 
              className="button button--secondary button--lg"
              to="/docs/questions/intro">
                  现在开始
          </Link>
          <Link 
                className="button button--warning button--lg"
                to="/blog/community">
                      加入组织
                </Link>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/easy-interview/fe-interview"
            className="button button--info button--lg">
                GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
