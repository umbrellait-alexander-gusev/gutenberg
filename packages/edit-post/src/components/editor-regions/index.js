/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { navigateRegions, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSimulatedMediaQuery } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

// const styleStorage = {};

function EditorRegions( { footer, header, sidebar, content, publish, className } ) {
	const [ simulatedWidth, updateSimulatedWidth ] = useState( window.innerWidth );

	const resizableStylesheets = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getSettings().resizableStylesheets;
	}, [] );

	useSimulatedMediaQuery( resizableStylesheets, simulatedWidth );

	return (
		<div className={ classnames( className, 'edit-post-editor-regions' ) }>
			{ !! header && (
				<div
					className="edit-post-editor-regions__header"
					role="region"
					/* translators: accessibility text for the top bar landmark region. */
					aria-label={ __( 'Editor top bar' ) }
					tabIndex="-1"
				>
					{ header }
				</div>
			) }
			<div className="edit-post-editor-regions__body">
				<div className="edit-post-editor-regions__width-toggles">
					<Button isTertiary isLarge onClick={ () => {
						updateSimulatedWidth( 2000 );
					} }>Desktop</Button>
					<Button isTertiary isLarge onClick={ () => {
						updateSimulatedWidth( 780 );
					} }>Tablet</Button>
					<Button isTertiary isLarge onClick={ () => {
						updateSimulatedWidth( 340 );
					} }>Mobile</Button>
				</div>
				<div
					className="edit-post-editor-regions__content"
					role="region"
					/* translators: accessibility text for the content landmark region. */
					aria-label={ __( 'Editor content' ) }
					tabIndex="-1"
					style={ { width: simulatedWidth, margin: '0 auto', flexGrow: 0 } }
				>
					{ content }
				</div>
				{ !! sidebar && (
					<div
						className="edit-post-editor-regions__sidebar"
						role="region"
						/* translators: accessibility text for the settings landmark region. */
						aria-label={ __( 'Editor settings' ) }
						tabIndex="-1"
					>
						{ sidebar }
					</div>
				) }
				{ !! publish && (
					<div
						className="edit-post-editor-regions__publish"
						role="region"
						/* translators: accessibility text for the publish landmark region. */
						aria-label={ __( 'Editor publish' ) }
						tabIndex="-1"
					>
						{ publish }
					</div>
				) }
			</div>
			{ !! footer && (
				<div
					className="edit-post-editor-regions__footer"
					role="region"
					/* translators: accessibility text for the footer landmark region. */
					aria-label={ __( 'Editor footer' ) }
					tabIndex="-1"
				>
					{ footer }
				</div>
			) }
		</div>
	);
}

export default navigateRegions( EditorRegions );
