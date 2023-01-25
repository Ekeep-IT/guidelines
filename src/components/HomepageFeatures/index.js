import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.scss';

const FeatureList = [
	{
		title: 'Guidelines Git',
		img: 'git/logo.png',
		alt: 'git-logo',
    suffixeUrl: 'guidelines/docs/category/git',
		description: <>Conventions, nommages, et bonnes pratiques git</>,
	},
	{
		title: 'Guidelines Front',
		img: 'front/front-logo.png',
		alt: 'frontend-logo',
		description: <>Conventions, nommages, et bonnes pratiques front</>,
	},
	{
		title: 'Guidelines Back',
		img: 'back/backend-logo.png',
		alt: 'backend-logo',
		description: <>Conventions, nommages, et bonnes pratiques back</>,
	},
];

function Feature({ img, baseUrl, suffixeUrl, title, alt, description}) {
  return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<a href={`${baseUrl}/${suffixeUrl}`}>
					<img className={styles.featureSvg} alt={alt} src={require(`/img/${img}`).default} />
				</a>
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
  const { siteConfig: {url} } = useDocusaurusContext();
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} baseUrl={url} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
