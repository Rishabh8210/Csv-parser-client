import { FC } from "react";
import { IQuestion } from "../components/Homepage";

interface PreviewPageProps {
  questionList: IQuestion[];
  setQuestionList: (questionList: null) => void
}
const PreviewPage: FC<PreviewPageProps> = ({ questionList, setQuestionList }) => {
  const handleSubmit = () => {
    setQuestionList(null)
    alert("Data pushed to DB");
  };
  return (
    <div className="preview">
        <div className="preview-screen">
            <h1>Preview Data</h1>
            <table border={2}>
            <thead>
                <tr>
                <th>Title</th>
                <th>Question Link</th>
                </tr>
            </thead>
            <tbody>
                {questionList &&
                questionList.map((question) => {
                    return (
                    <tr>
                        <td>{question.title}</td>
                        <td>
                        <a href={question.questionLink} target="_blank">
                            {question.questionLink}
                        </a>{" "}
                        </td>
                    </tr>
                    );
                })}
            </tbody>
            </table>
            <div>
            <button type="submit" onClick={() => handleSubmit()}>
                Upload
            </button>
            </div>
        </div>
    </div>
  );
};

export default PreviewPage;
