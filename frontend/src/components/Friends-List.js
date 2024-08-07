import { Component } from "../core/Component.js";
import { FriendsInfo } from "./Friends-Info.js";
import { List } from "./List.js";
import { changeUrl, parsePath } from "../core/router.js";
import { Input } from "./Input.js";

export class FriendsList extends Component {

  constructor($el, props) {
    super($el, props);
	this.users = [];
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
					<div id="addDiv">
	                    <div class="friendsEdit" id="addFriend">Add</div>
					</div>
					<div id="search"></div>
                </div>
            </div>
        </div>
    `;
  }

  async mounted() {
    try {
      // 서버에서 친구 목록, 유저 목록 받기 (user 제외한 명단)
      const response = await fetch('http://localhost:8000/api/user/get/');

      // 응답이 성공적이지 않을 경우 에러를 던집니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

	  this.friends = await response.json();
    //	JSON 형식으로 응답 데이터를 파싱합니다.
    //   const list = await response.json();
	//   this.friends = list.friends;
	//   this.users = list.users;

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
		this.search = new Input(ulElement, {inputId: "searchInput", imageId: "addInputImage", img: "../../plus.jpeg"});
		this.children.push(this.search);
	  });

	function addInput(){
		const searchInput = document.querySelector("input#addInput");
		const nickname = searchInput.value.trim();

		const isFriend = this.friends.find(friend => friend.nickname === nickname);
		// const isUser = this.users.find(user => user.nickname === nickname);
		// if (!isFriend && isUser)
		if (!isFriend)
		{
			// 정상적으로 실행된 경우
			// 백엔드에 add friends 요청
			changeUrl(window.location.pathname);
		}
	}

	this.addEvent('keydown', '#addInput', (event) =>{
		if (event.key === 'Enter') { addInput.call(this); } })

	this.addEvent('click', '#addInputImage', () =>{ addInput.call(this); })
	
	this.addEvent('input', '#searchInput', (event) => {
		const searchResults = document.querySelector('#searchResults');

		const query = event.target.value.toLowerCase();
		searchResults.innerHTML = ''; // 기존 결과 초기화

		if (query.length === 0) {
			searchResults.style.display = 'none'; // 입력값이 없으면 결과 숨김
			return;
		}

		const filteredUsers = this.friends.filter(user => user.nickname.toLowerCase().startsWith(query));

		if (filteredUsers.length > 0) {
			searchResults.style.display = 'block'; // 결과가 있으면 결과 표시
		} else {
			searchResults.style.display = 'none'; // 결과가 없으면 결과 숨김
		}

		filteredUsers.slice(0, 2).forEach(user => {
			const div = document.createElement('div');
			div.className = 'search-result-item';
			div.textContent = user.nickname;
			searchResults.appendChild(div);
		});

		if (filteredUsers.length > 2) {
			filteredUsers.slice(2).forEach(user => {
				const div = document.createElement('div');
				div.className = 'search-result-item';
				div.textContent = user.nickname;
				searchResults.appendChild(div);
			});
		}
	})

	this.addEvent('click', '#searchResults', (event) => {
		const searchInput = document.querySelector('#searchInput');
		const searchResults = document.querySelector('#searchResults');
		if (event.target.classList.contains('search-result-item')) {
			searchInput.value = event.target.textContent;
			searchResults.style.display = 'none';
		}
	})
	
	this.addEvent('click', '.removeFriend', (event) => {
		// 친구 remove 요청
		const remove = event.target.id;
		//
		changeUrl(window.location.pathname);
	  });
  }
}
