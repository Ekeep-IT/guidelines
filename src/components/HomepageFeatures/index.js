import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
	{
		title: 'Guidelines Git',
		img: 'git/logo.png',
		alt: 'git-logo',
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

function Feature({ img, title, alt, description}) {
  return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<img className={styles.featureSvg} alt={alt} src={require(`/img/${img}`).default} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
