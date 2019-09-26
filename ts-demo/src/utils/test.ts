/**
 *   ts  测试
 */

export function test(a): string {
    return a
}

const func1 = (a: number): number => {
    return Number(test(a))
}

func1(1)







