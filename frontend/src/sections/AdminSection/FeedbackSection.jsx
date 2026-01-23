import useFeedback from "../../hooks/useFeedback";

const FeedbackSection = () => {

  const { loading, data } = useFeedback();

  if (loading) return <>Loading...</>;

  return (
    <>Return this when user is hr-admin</>
  );
};

export default FeedbackSection;
