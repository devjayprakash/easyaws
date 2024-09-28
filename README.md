# Easy AWS

## Vision

At Easy AWS, our mission is to develop intuitive tools that simplify the experience of using AWS services. We aim to create standalone applications that streamline interactions with AWS, making cloud management accessible to all users.

## S3 Explorer

### Overview

Currently, our flagship tool is **S3 Explorer**. This application allows users to effortlessly navigate Amazon S3, create buckets, transfer files, and download content. With its user-friendly explorer-like interface, S3 Explorer simplifies complex operations, making them accessible even for those who are not AWS experts.

![S3 Explorer Screenshot](./screenshots/preview.png 'S3 Explorer Preview')

### Features

-   **User-Friendly Interface**: Navigate your S3 buckets with ease.
-   **File Management**: Create, upload, download, and manage files seamlessly.
-   **Bucket Creation**: Easily set up new S3 buckets with a few clicks.
-   **Real-Time Operations**: Enjoy smooth interactions with S3, leveraging AWS APIs.

## Contribution Guidelines

Thank you for considering contributing to the Easy AWS project! To get started, please follow these steps:

1. **Clone the Repository**: Use `git clone <repository-url>` to copy the repo to your local machine.
2. **Install Dependencies**: Since this is a monorepo managed with Yarn workspaces, run `yarn install` from the root directory.
3. **Navigate to the S3 Explorer Directory**: Change into the `s3explorer` folder using `cd s3explorer`.
4. **Start Development**: Initiate the development server with `yarn dev`.

### Before You Submit a Pull Request

-   **Feature Discussion**: Please discuss your proposed features with me before starting development to ensure alignment with the project vision.
-   **Code Quality**: While there are currently no pre-commit hooks or linting checks, it is crucial that you conduct your own code quality checks prior to submitting a pull request.
-   **Bug Fixes**: For bug fixes, please refer to the issues section to identify existing problems and solutions.

## How S3 Explorer Works

S3 Explorer operates by leveraging AWS S3 APIs for all interactions with S3. The architecture is designed to optimize performance and user experience:

-   **Communication Flow**: Requests are sent from the renderer to a preload script and then routed to the main process.
-   **In-Memory Caching**: To reduce redundant API calls, we implement an in-memory cache that stores recent requests and their responses.
-   **User Data Storage**: User data, including account information, tabs, and cache, is stored locally on the user's machine. We prioritize user privacy and do not collect any personal data.

## Technology Stack

-   **Electron**: Used for building cross-platform desktop applications.
-   **Electron Forge**: A framework for simplifying the setup and development of Electron apps.
-   **React**: For building the user interface.
-   **Tailwind CSS**: For styling and responsive design.
-   **TypeScript**: Ensures type safety and improves code quality.
-   **AWS APIs**: Facilitates seamless communication with Amazon S3.

## Acknowledgments

This project would not have been possible without the support of several open-source libraries and frameworks, including:

-   [Monaco Editor](https://github.com/microsoft/monaco-editor)
-   [Electron](https://github.com/electron/electron)
-   [Zustand](https://github.com/pmndrs/zustand)
-   [React](https://github.com/facebook/react)
-   [Shadcn UI](https://github.com/shadcn-ui/ui)

We extend our gratitude to these communities for their contributions that have made S3 Explorer a reality.

---

For any additional questions or guidance, feel free to reach out! Thank you for your interest in contributing to Easy AWS!
