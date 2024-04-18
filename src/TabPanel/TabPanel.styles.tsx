import styled from 'styled-components';

export const TabContent = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`;
