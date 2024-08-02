import { Component } from "../core/Component.js";
import { FriendsInfo } from "./Friends-Info.js";
import { List } from "./List.js";

export class FriendsList extends Component {

  constructor($el, props) {
    super($el, props);
    this.users = []; // users 속성을 초기화
    this.info = null; // info 속성을 초기화
  }

  template () {
    return `
        <div id="friendsBox">
            <div id="friendsWindow">
                <div id="friendsMenu">
                    <p id="friendsMenu">Friends List</p>
                </div>
                <div id="friendsBody">
                    <div id="friendsList">
                      <ul id="friendsLists"></ul>
                    </div>
                    <div id="friendsInfo">
                    </div>
                </div>
                <div id="friendsEdit">
                    <div class="friendsEdit" id="addFriend">Add</div>
                    <div class="friendsEdit" id="removeFriend">Remove</div>
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
      this.users = await response.json();

      // 유저 목록에서 닉네임 배열을 추출합니다.
      const nicknames = this.users.map(user => user.nickname);

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

	  const friend = this.users.find(user => user.nickname === event.target.textContent);

      // 새로운 FriendsInfo 인스턴스를 생성하고, this.children에 추가
      this.info = new FriendsInfo(ulElement, {is_online: friend.is_online, nickname: friend.nickname, img_url: friend.img_url});
      this.children.push(this.info);
    });

	// this.addEvent('click', '#goProfile', (target) => {
	// 	changeUrl(`/main/profile/${target.}`);
	//   });
  }
}
