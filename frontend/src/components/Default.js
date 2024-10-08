import { Component } from "../core/Component.js";

export class Default extends Component {
	template () {
		return `
		<div id="BG">
			<div id="leftBG">
				<div id="leftBar"></div>
			</div>
			<div id="rightBG">
				<div id="rightBar"></div>
			</div>
		</div>
		<div id="centerBG">
			<div id="topBG">
				<svg id="topParticle" xmlns="http://www.w3.org/2000/svg" width="100" height="110" viewBox="0 0 140 150" fill="none">
					<rect x="109.231" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect y="83.8428" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="57.6921" y="58.952" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="73.0769" y="19.6506" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="93.8462" y="70.7424" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="25.3848" y="136.9" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="25.3848" y="13.1004" width="15.3846" height="13.1004" fill="#31363F"/>
					<rect x="124.615" y="41.9214" width="15.3846" height="13.1004" fill="#31363F"/>
				</svg>
				<svg id="topBall" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" fill="none">
					<circle cx="50" cy="50" r="50" fill="#31363F"/>
				</svg>
			</div>
			<div id="bottomBG">
				<svg id="bottomParticle" xmlns="http://www.w3.org/2000/svg" width="100" height="110" viewBox="0 0 140 150" fill="none">
					<rect x="30.7693" y="150" width="15.3846" height="13.1004" transform="rotate(180 30.7693 150)" fill="#F5F6FA"/>
					<rect x="140" y="66.1572" width="15.3846" height="13.1004" transform="rotate(180 140 66.1572)" fill="#F5F6FA"/>
					<rect x="82.3076" y="91.048" width="15.3846" height="13.1004" transform="rotate(180 82.3076 91.048)" fill="#F5F6FA"/>
					<rect x="66.9231" y="130.349" width="15.3846" height="13.1004" transform="rotate(180 66.9231 130.349)" fill="#F5F6FA"/>
					<rect x="46.1538" y="79.2576" width="15.3846" height="13.1004" transform="rotate(180 46.1538 79.2576)" fill="#F5F6FA"/>
					<rect x="114.615" y="13.1004" width="15.3846" height="13.1004" transform="rotate(180 114.615 13.1004)" fill="#F5F6FA"/>
					<rect x="114.615" y="136.9" width="15.3846" height="13.1004" transform="rotate(180 114.615 136.9)" fill="#F5F6FA"/>
					<rect x="15.3848" y="108.079" width="15.3846" height="13.1004" transform="rotate(180 15.3848 108.079)" fill="#F5F6FA"/>
				</svg>
				<svg id="bottomBall" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" fill="none">
					<circle cx="50" cy="50" r="50" fill="#F5F6FA"/>
				</svg>
			</div>
		</div>
		<div id="margin">
			<div id="border">
			<div id="contents">
			</div>
			</div>
		</div>
		`;
	}
}