import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.style.jsx';
import { useNavigate } from 'react-router';

const DirectoryItem = ({ category }) => {
  const { imageUrl = '', title = '', route = '' } = category ?? {};

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage $imageurl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
