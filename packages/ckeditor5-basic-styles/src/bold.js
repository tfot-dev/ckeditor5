/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Feature from '../core/feature.js';
import BoldEngine from './boldengine.js';
import ButtonController from '../ui/button/button.js';
import ButtonView from '../ui/button/buttonview.js';
import Model from '../ui/model.js';

/**
 * The bold feature. It introduces the Bold button and the <kbd>Ctrl+B</kbd> keystroke.
 *
 * It uses the {@link basic-styles.BoldEngine bold engine feature}.
 *
 * @memberOf basic-styles
 * @extends core.Feature
 */
export default class Bold extends Feature {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ BoldEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'bold' );
		const keystroke = 'CTRL+B';

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: t( 'Bold' ),
			icon: 'bold',
			keystroke
		} );

		// Bind button model to command.
		buttonModel.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => editor.execute( 'bold' ) );

		// Add bold button to feature components.
		editor.ui.featureComponents.add( 'bold', ButtonController, ButtonView, buttonModel );

		// Set the Ctrl+B keystroke.
		editor.keystrokes.set( keystroke, 'bold' );
	}
}
