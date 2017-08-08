/* globals describe, it */
const React = require( 'react' );
const sinon = require( 'sinon' );
const chai = require( 'chai' );
const sinonChai = require( 'sinon-chai' );
const chaiEnzyme = require( 'chai-enzyme' );
chai.use( chaiEnzyme() );
chai.use( sinonChai );
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

	it( 'passes className on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', className: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'className', 'foobar' );
	} );

	it( 'passes title on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', title: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'title', 'foobar' );
	} );

	it( 'passes id on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', id: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'id', 'foobar' );
	} );

	it( 'passes alt on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', alt: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'alt', 'foobar' );
	} );

	it( 'passes srcset on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', srcset: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'srcset', 'foobar' );
	} );

	it( 'passes sizes on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', sizes: 'foobar' } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'sizes', 'foobar' );
	} );

	it( 'passes onClick on to the image', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const onClick = () => 'clicked';
		const wrapper = shallow( el( EnsuredImage, { ImageComponent, src: 'my-test-image.png', onClick } ) );
		expect( wrapper.find( ImageComponent ) ).to.have.prop( 'onClick', onClick );
	} );

	it( 'calls onError after setting the placeholder', function() {
		const ImageComponent = ( { src } ) => el( 'img', { src } );
		const PlaceholderComponent = () => el( 'p', 'placeholder' );
		const onError = sinon.spy();
		const wrapper = shallow( el( EnsuredImage, { PlaceholderComponent, ImageComponent, src: 'my-test-image.png', onError } ) );
		wrapper.find( ImageComponent ).simulate( 'error' );
		expect( onError ).to.have.been.called;
	} );
} );
