import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { api } from "../../config";

const TinymceEditor = ({ onUploadImage, initDataValue }) => {
	const editorRef = useRef(null);
	return (
		<>
			<Editor
				tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={initDataValue}
				init={{
					placeholder: "Enter content description",
					deprecation_warnings: false,
					height: 500,
					menubar: "file edit insert view format",
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"help",
						"wordcount",
						"autoresize",
					],
					toolbar:
						"undo redo removeformat| blocks bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap ",
					automatic_uploads: true,
					images_upload_url: `${api.BASE_URL}/save-content-image`,
					relative_urls: false,
					remove_script_host: false,
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
				onBlur={(e) => onUploadImage(e)}
			/>
			<input id="my-file" type="file" name="my-file" style={{ display: "none" }} />
		</>
	);
};

export default TinymceEditor;
