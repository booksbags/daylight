import React, { ChangeEvent, useCallback, useRef } from 'react'
import { UploadStyle } from './style'
import { useUpdate } from '@hooks/useUpdate';
import Toast from '@utils/toast';

type UploadType = {
    multipart?: boolean,
    max?: number,
    onChange?: (files?: string[]) => void;
    value?: string[],
    defaultValue?: string[];
}

const Upload = ({
    multipart = false,
    max = 1,
    onChange,
    value,
    defaultValue = []
}: UploadType) => {
    const urls = useRef<string[]>(value || defaultValue);
    const achieveUrlCount = useRef<number>(0);
    const update = useUpdate();
    const imgIndex = useRef<number>(0);
    const fileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const length = files.length;
            const imgs:string[] = [];
            for (let i = 0; i < length; i++) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files[i]);
                fileReader.addEventListener("load", () => {
                    // 修改
                    if (urls.current[imgIndex.current]) {
                        urls.current[imgIndex.current] = fileReader.result as string;
                        onChange?.(urls.current);
                        update();
                    } else {//新增
                        if (urls.current.length + length > max) {
                            Toast.show(`图片限制为${max}张`);
                            return;
                        }
                        imgs.push(fileReader.result as string);
                        imgIndex.current += 1;
                        achieveUrlCount.current += 1;
                        if (achieveUrlCount.current === length) {
                            achieveUrlCount.current = 0;
                            urls.current.push(...imgs);
                            onChange?.(urls.current);
                            update();
                        }

                    }
                });
            }
        }
    }, []);
    return (
        <UploadStyle>
            {
                (urls.current.length == max ? urls.current : [...urls.current, null]).map((item, index, array) => {
                    return (
                        <label>
                            <input
                                type="file"
                                onChange={fileChange}
                                multiple={multipart && (index === array.length - 1 ? true : false)}
                                max={multipart ? (index === array.length - 1 ? max : 1) : 1}
                            />
                            <div
                                style={{
                                    backgroundImage: item ? `url(${item})` : undefined
                                }}
                                onClick={() => imgIndex.current = index}
                            ></div>
                        </label>
                    )
                })
            }
        </UploadStyle>
    )
}

export default Upload
