import { animated, useSpring } from "@react-spring/web"
import { Divider } from "antd"
import Title from "antd/es/typography/Title"

export type CTitlePageParams = {
  title: string
}
const AnimatedTitle = animated(Title)
const CTitlePage: React.FC<CTitlePageParams> = ({ title }) => {
  const springs = useSpring({
    from: { x: -30, opacity: 0 },
    to: { x: 0, opacity: 1 },
  })

  return <>
    <AnimatedTitle style={{ marginTop: '6px', ...springs }} level={2}>
      {title}
    </AnimatedTitle>
    <Divider />
  </>
}
export default CTitlePage