export interface PostData {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  views: number;
  detail: string;
  authorId: string;
}


export interface PostCardType {
  _id: string;
  title: string;
  username: string;
  description: string;
  imageUrl: string;
  category: string;
  views: number;
  createdAt: string;
  details: string;
  author: {
    id:string,
    username: string,
    profileImage:string
  }
  profileImage:string
};