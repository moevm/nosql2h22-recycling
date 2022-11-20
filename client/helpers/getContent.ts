const getContent = (fileName: string) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`../content/${fileName}.json`);
};

export default getContent;
