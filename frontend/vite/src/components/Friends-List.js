import { Component } from "../core/Component.js";
import { FriendsInfo } from "./Friends-Info.js";
import { List } from "./List.js";
import { changeUrl, parsePath } from "../core/router.js";
import { Input } from "./Input.js";

export class FriendsList extends Component {

  constructor($el, props) {
    super($el, props);
	this.user = [];
    this.friends = []; // friends 속성을 초기화
    this.info = null; // info 속성을 초기화
	this.search = null;
  }

  template () {
    return `
        <div id="friendsBox">
			<img src="../../back.png" id="goBack"></img>
            <div id="friendsWindow">
                <div id="friendsMenu">
                    <p id="friendsMenu">Friends List</p>
                </div>
                <div id="friendsBody">
                    <div id="friendsList">
                      <ul id="friendsLists"></ul>
                    </div>
                    <div id="friendsInfo">
						<div id="defaultImgBox">
							<img id="friendDefaultImg" src="../../friends.png"></img>
						</div>
                    </div>
                </div>
                <div id="friendsEdit">
                    <div class="friendsEdit" id="addFriend">Add</div>
                    <div class="friendsEdit" id="removeFriend">Remove</div>
					<div id="search"></div>
                </div>
            </div>
        </div>
    `;
  }

  async mounted() {
    try {
      // 서버에서 유저 목록을 가져옵니다.
      const response = await fetch('http://localhost:8000/api/user/get/');

      // 응답이 성공적이지 않을 경우 에러를 던집니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // JSON 형식으로 응답 데이터를 파싱합니다.
      this.friends = await response.json();

      // 유저 목록에서 닉네임 배열을 추출합니다.
      const nicknames = this.friends.map(user => user.nickname);

      // HTML 요소를 선택하고, 닉네임을 기반으로 리스트를 생성합니다.
      const ulElement = document.querySelector("ul#friendsLists");
      this.children.push(new List(ulElement, 
          { className: "fList", contents: nicknames }));
    } catch (error) {
      console.error('Fetch operation failed:', error);
    }
  }

  setEvent() {
    this.addEvent('click', '.fList', (event) => {
      const ulElement = document.querySelector("div#friendsInfo");

      // 기존 info가 존재하면, children에서 제거
      if (this.info) {
        const index = this.children.indexOf(this.info);
        if (index !== -1) {
          this.children.splice(index, 1);
        }
      }

	  const friend = this.friends.find(user => user.nickname === event.target.id);

      // 새로운 FriendsInfo 인스턴스를 생성하고, this.children에 추가
      this.info = new FriendsInfo(ulElement, {is_online: friend.is_online, nickname: friend.nickname, img_url: friend.img_url});
      this.children.push(this.info);
    });

	this.addEvent('click', '#goBack', (event) => {
		window.history.back();
	  });

	this.addEvent('click', '.goProfile', (event) => {
		changeUrl(`/main/profile/${event.target.id}`);
	  });

	this.addEvent('click', '#addFriend', (event) => {
		const ulElement = document.querySelector("div#search");

		if (this.search) {
		  const index = this.children.indexOf(this.search);
		  if (index !== -1) {
			this.children.splice(index, 1);
		  }
		}
		this.search = new Input(ulElement, {inputId: "addInput", imageId: "addInputImage", img: "../../plus.jpeg"});
		this.children.push(this.search);
	  });

	  this.addEvent('keydown', '#addInput', (event) =>{
		if (event.key === 'Enter') {
			const searchInput = document.querySelector("input#addInput");
			const nickname = searchInput.value.trim();

			let friendExists = false;

			for (let i = 0; i < this.friends.length; i++) {
				if (this.friends[i].nickname === nickname) {
					friendExists = true;
					break;
				}
			}

			if (friendExists)
			{
				const alert = document.querySelector("span#addInputAlert");
				alert.textContent = "already exists in your friends list";
				return ;
			}

			// user 존재 확인
			// let userExists = false;

			// for (let i = 0; i < this.user.length; i++) {
			// 	if (this.user[i].nickname === nickname) {
			// 		friendExists = true;
			// 		break;
			// 	}
			// }

			// if (!friendExists)
			// {
			// 	const alert = document.querySelector("span#addInputAlert");
			// 	alert.textContent = "user does not exist";
			// 	return ;
			// }


			// friend 추가
			
			changeUrl(window.location.pathname);
		}
	  })

	  this.addEvent('click', '#addInputImage', (event) =>{
		const searchInput = document.querySelector("input#addInput");
		const nickname = searchInput.value.trim();

		let friendExists = false;

		for (let i = 0; i < this.friends.length; i++) {
			if (this.friends[i].nickname === nickname) {
				friendExists = true;
				break;
			}
		}

		if (friendExists)
		{
			const alert = document.querySelector("span#addInputAlert");
			alert.textContent = "already exists in your friends list";
			return ;
		}

		// user 존재 확인
		// let userExists = false;

		// for (let i = 0; i < this.user.length; i++) {
		// 	if (this.user[i].nickname === nickname) {
		// 		friendExists = true;
		// 		break;
		// 	}
		// }

		// if (!friendExists)
		// {
		// 	const alert = document.querySelector("span#addInputAlert");
		// 	alert.textContent = "user does not exist";
		// 	return ;
		// }


		// friend 추가
		
		changeUrl(window.location.pathname);
	  })

	  
	  this.addEvent('click', '#removeFriend', (event) => {
		const ulElement = document.querySelector("div#search");

		if (this.search) {
		  const index = this.children.indexOf(this.search);
		  if (index !== -1) {
			this.children.splice(index, 1);
		  }
		}
		this.search = new Input(ulElement, {inputId: "removeInput", imageId: "removeInputImage", img: "../../minus.png"});
		this.children.push(this.search);
	  });

	  this.addEvent('keydown', '#removeInput', (event) =>{
		if (event.key === 'Enter') {
			const searchInput = document.querySelector("input#removeInput");
			const nickname = searchInput.value.trim();

			let friendExists = false;

			for (let i = 0; i < this.friends.length; i++) {
				if (this.friends[i].nickname === nickname) {
					friendExists = true;
					break;
				}
			}

			if (!friendExists)
			{
				const alert = document.querySelector("span#removeInputAlert");
				alert.textContent = `nickname is not on your friends list`;
				return ;
			}

			// friend 삭제

			changeUrl(window.location.pathname);
		}
	  })

	  this.addEvent('click', '#removeInputImage', (event) =>{
		const searchInput = document.querySelector("input#removeInput");
		const nickname = searchInput.value.trim();

		let friendExists = false;

		for (let i = 0; i < this.friends.length; i++) {
			if (this.friends[i].nickname === nickname) {
				friendExists = true;
				break;
			}
		}

		if (!friendExists)
		{
			const alert = document.querySelector("span#removeInputAlert");
			alert.textContent = `nickname is not on your friends list`;
			return ;
		}

		// friend 삭제

		changeUrl(window.location.pathname);
	  })
  }
}
