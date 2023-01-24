import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

import styles from './notfound.module.css';

export default function NotFound() {
  return (
		<>
			<PageMetadata
				title={translate({
					id: 'theme.NotFound.title',
					message: 'Page non trouvé',
				})}
			/>
			<Layout>
				<main className="container margin-vert--xl">
					<div className="row">
						<div className={`${styles['container-text']} col col--6 col--offset-3`}>
							<h1 className="hero__title">Page non trouvé</h1>
							<p>
								<Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page"></Translate>
							</p>
						</div>
						<div className={styles['container-not-found-image']}>
							<img className={styles['not-found-image']} src={require(`/img/keepy/keepy-vacances.png`).default} />
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
