import { Icon } from "antd-mobile"
import React from "react"
import styled from "styled-components"

const DIV = styled.div`
  .showBlock {
    display: flex;

    .left {
      width: 50%;
      min-height: 25vh;
      background: rgb(236, 236, 236);
      padding: 10px 0 10px 10px;
      position: relative;

      .wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .head {
          display: flex;

          svg {
            width: 1em;
            height: 1em;
            margin-right: 8px;
            transform: rotate(45deg);
          }

          span {
            display: inline-block;
            word-break: break-all;
          }
        }

        .detail {
          div {
            margin: 4px 8px 4px 6vw;

            span {
              margin-left: 12px;
            }
          }
        }
      }
    }

    .right {
      width: 50%;
      min-height: 25vh;
      background: white;
      position: relative;
    }
  }
`
interface Props {}

const test = (props: Props) => {
  return (
    <DIV>
      <div className="showBlock">
        <div className="left">
          <div className="wrapper" v-if="!showEmpty">
            <div className="head">
              <span>你</span>
              <span>食品wwwwwwwwwwwwwwwwwwwwwwwwwww</span>
            </div>
            <div className="detail">
              <div v-if="this.switchKind!=='kind'">
                单价<span>666</span>
              </div>
              <div>
                数量<span>666</span>
              </div>
              <div>
                金额<span>666</span>
              </div>
            </div>
          </div>
          <div className="wrapper" v-if="!showEmpty">
            <div className="head">
              <span>222</span>
              <span>食品</span>
            </div>
            <div className="detail">
              <div v-if="this.switchKind!=='kind'">
                单价<span>666</span>
              </div>
              <div>
                数量<span>666</span>
              </div>
              <div>
                金额<span>666</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DIV>
  )
}

export default test
