/* globals describe, it */
const React = require( 'react' );
const chai = require( 'chai' );
const chaiEnzyme = require( 'chai-enzyme' );
chai.use( chaiEnzyme() );
const { expect } = chai;
const EnsuredImage = require( '../index' );
const { shallow } = require( 'enzyme' );

const el = React.createElement;

describe( 'EnsuredImage', function() {
	it( 'renders the image src from props', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.attr( 'src', 'my-test-image.png' );
	} );

	it( 'renders the placeholder if the image does not load', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const PlaceholderComponent = () => el( 'p', 'placeholder' );
		const wrapper = shallow( el( EnsuredImage, { PlaceholderComponent, ImageComponent, src: 'my-test-image.png' } ) );
		wrapper.find( ImageComponent ).simulate( 'error' );
		expect( wrapper.find( PlaceholderComponent ) ).to.have.length( 1 );
	} );

	it( 'retries rendering the image src after retryAfter miliseconds', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const PlaceholderComponent = () => el( 'p', 'placeholder' );
		const mockSetTimeout = ( callBack, timeUntil ) => timeUntil === 101 && callBack();
		const wrapper = shallow( el( EnsuredImage, { PlaceholderComponent, ImageComponent, retryAfter: 101, setTimeout: mockSetTimeout, src: 'my-test-image.png' } ) );
		wrapper.find( ImageComponent ).simulate( 'error' );
		expect( wrapper.find( ImageComponent ) ).to.have.length( 1 );
	} );
} );
