import Constants from "expo-constants";
import styled from "styled-components/native";
export const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme["PRIMARY_COLOR"]};
  flex: 1;
  //align-items: center;
  justify-content: center;
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export const ModalView = styled.SafeAreaView`
  background-color: ${(props) => props.theme["PRIMARY_COLOR"]};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
export const TitleText = styled.Text`
  font-weight: 600;
  text-align: center;
  font-size: ${(props) => props.fontSize || "18px"};
  color: ${(props) => props.theme["TITLE_COLOR"]};
`;
export const TitleText2 = styled.Text`
  margin-left: 8;
  font-size: ${(props) => props.fontSize || "18px"};
  color: ${(props) => props.theme["TITLE_COLOR"]};
`;
export const PostContainer = styled.View`
  padding: 10px 20px;
  width: 100%;
`;
export const PostText = styled.Text`
  color: ${(props) => props.theme["SECONDARY_COLOR"]};
  font-size: 16px;
  padding: 10px 0 0;
  font-weight: ${(props) => props.fontWeight || "400"};
`;

export const Cardview = styled.View`
  background-color: ${(props) => props.theme["CARD_COLOR"]};
  font-weight: ${(props) => props.fontWeight || "400"};
  border-width: 1;
  padding: 10px;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  margin-left: 5;
  margin-right: 5;
  margin-top: 10;
  display: flex;
`;

export const TextNew = styled.TextInput`
  background-color: white;
  align-self: stretch;
  padding: 8px;
  border-bottom-width: 2px;
  margin: 8px;
  border-bottom-color: ${(props) => props.theme["borderBottomColor"]};
`;
export const TextNews = styled.TextInput`
  background-color: white;
  align-self: stretch;
  padding: 8px;
  border-bottom-width: 2px;
  margin: 8px;
  border-bottom-color: ${(props) => props.theme["borderBottomColor"]};
`;

export const Sidebar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin: 8px 4px;
  justify-content: flex-end;
`;
export const FloatButton = styled.TouchableOpacity`
  border-width: 1;
  border-color: red;
  align-items: center;
  justify-content: center;
  width: 70;
  position: absolute;
  top: 450;
  right: 30;
  height: 70;
  background-color: red;
  border-radius: 100;
`;
