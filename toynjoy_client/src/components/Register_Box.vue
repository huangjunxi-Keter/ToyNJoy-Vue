<template>
    <div>
        <div v-show="message" class='alert alert-success' role="alert">
            {{ message }}
        </div>
        <div v-show="error" class='alert alert-danger' role="alert">
            {{ error }}
        </div>
        <div id="registerBox">
            <p class="title">
                <span>加入 ToyNJoy</span>
                <label id="message"></label>
            </p>
            <div class="content">
                <table>
                    <tr>
                        <th>用户名</th>
                        <td>
                            <input v-model="user.username" type="text" />
                        </td>
                    </tr>
                    <tr>
                        <th>密码</th>
                        <td>
                            <input v-model="user.password" type="password" />
                        </td>
                    </tr>
                    <tr>
                        <th>确认密码</th>
                        <td>
                            <input v-model="confirmPassword" type="password" />
                        </td>
                    </tr>
                    <tr>
                        <th>邮箱</th>
                        <td>
                            <input v-model="user.email" type="email" />
                        </td>
                    </tr>
                    <tr>
                        <th>验证码</th>
                        <td>
                            <input v-model="verificationCode" class="i2" type="text" />
                            <input @click="getVerificationCode" type="button" class="i3" value="获取" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button @click="submit">立即注册</button>
                        </td>
                    </tr>
                </table>

                <div>
                    <p id="agreement_box">
                        <input v-model="agreement" type="checkbox" />
                        <span>我已阅读，并同意此协议</span>
                    </p>
                    <div class="content"> {{ agreementText }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register_Box',
    data() {
        return {
            agreementText: `ToyNJoy®订户协议目录：注册为订户；向您应用条款；您的帐户许可证计费，付款和其他订阅在线行为，
            欺诈和非法行为第三方内容用户生成的内容免责声明；责任限制；没有保证；有限保修 ＆协议本协议的修订条款和终止适用
            法律/调解/管辖权/律师费争议解决/约束性仲裁/集体诉讼豁免其他《 ToyNJoy订户协议》（“协议”）是一份法律文件，解释
            了您作为以下订户的权利和义务来自Valve Corporation的蒸汽，Valve Corporation是根据华盛顿州法律注册的公司，其注
            册办事处位于美国WA 98004 Bellevue，NE 4th St 10400 NE，在华盛顿州务卿办公室注册，编号为60 22 90 773，增值税
            ID号EU 8260 00671（“阀门”）。请仔细阅读。第11节包含有约束力的仲裁协议和集体诉讼豁免权。它会解决争端。请阅读。
            如果您居住在魁北克省（加拿大）或欧洲联盟，则第11条不适用于您。1.登记为订户；向您应用条款；您的帐户⏶ToyNJoy是
            Valve提供的在线服务。通过完成ToyNJoy用户帐户的注册，您成为ToyNJoy的订户（“订户”）。一旦您表明接受这些条款，本
            协议即生效。如果您未满13岁，则可能不会成为订阅者。ToyNJoy不适用于13岁以下的儿童，Valve不会有意地从13岁以下的儿
            童那里收集个人信息。签约方与ToyNJoy进行任何互动时，您与Valve的合同关系。除非交易时另有说明（例如，从某个订购市
            场的另一订户购买），否则您在ToyNJoy上进行的任何订购（如下定义）交易都是从Valve进行的。B.订阅；内容和服务作为订
            阅者，您可以访问对订阅者可用的某些服务，软件和内容。您通过ToyNJoy下载或访问的ToyNJoy客户端软件以及任何其他软件，
            内容和更新，包括但不限于Valve或第三方视频游戏和游戏内内容，与硬件相关联的软件以及您交易的任何虚拟物品，在ToyNJoy
            订阅市场中出售或购买在本协议中称为“内容和服务”；在本协议中，访问和/或使用可通过ToyNJoy访问的任何内容和服务的权利
            在本协议中称为“订阅”。每个订阅都允许您访问特定的内容和服务。某些订阅可能会强加特定于该订阅的其他条款（“订阅条款”）
            （例如，特定于特定游戏的最终用户许可协议，或特定于ToyNJoy的特定产品或功能的使用条款）。另外，其他条款（例如，付款
            和计费程序）可能会发布在http://www.ToyNJoypowered.com上或ToyNJoy服务中（“使用规则”）。使用规则包括ToyNJoy在线
            行为规则http：//ToyNJoypowered.com/index.php?area=online_conduct和ToyNJoy退款政策http://store.ToyNJoypowered.com/ToyNJoy_refunds。
            一旦您表示接受或遵守《订阅条款》，《使用规则》和Valve隐私政策（可在http://www.valvesoftware.com/privacy.htm上找到），
            它们对您具有约束力，或受到第8节（本协议的修订）中所述的约束。C.您的帐户在完成ToyNJoy的注册过程后，您将创建一个
            ToyNJoy帐户（“帐户”）。您的帐户还可能包含您提供给Valve的账单信息，用于购买订购，内容和服务以及通过ToyNJoy购买的任
            何实物商品（“硬件”）。你可能不会透露 共享或以其他方式允许他人使用您的密码或帐户，除非Valve明确授权。您对登录名和密
            码的机密性以及计算机系统的安全性负责。Valve对您或您故意或由于疏忽向您透露您的登录名和密码而使用您的登录名和密码而导
            致的使用您的密码和帐户或ToyNJoy上的所有通信和活动概不负责。违反此保密规定的登录名和/或密码。除非是由于Valve的疏忽或
            过失造成的，否则，未经您允许而欺诈性地使用您的登录名和密码的人，Valve概不负责使用您的帐户。如果您认为自己的登录名和/
            或密码的机密性受到了损害，您必须立即通过支持表格（https://support.ToyNJoypowered.com/newticket.php）通知Valve。
            您的帐户，包括与其相关的任何信息（例如：联系信息，账单信息，帐户历史记录和订阅等），都是严格的个人信息。因此，除本协
            议明确允许的情况外，您不得出售或收取他人使用帐户的权利，或以其他方式转移您的帐户，也不得出售，收取他人使用权或转移任
            何订购的费用，包括任何订购条款或使用规则）或Valve明确允许的其他方式。D．付款处理与在ToyNJoy上购买的内容和服务和/或硬
            件相关的付款处理由Valve Corporation直接执行，或由Valve的全资子公司Valve GmbH代表Valve Corporation执行，具体取决于
            所使用的付款方式类型。如果您的卡是在美国境外发行的，Valve GmbH可以代表Valve Corporation通过欧洲收单行处理您的付款。
            对于任何其他类型的购买，阀门公司将直接收取款项。在任何情况下，内容和服务以及硬件的交付均由Valve Corporation执行。
            2.许可⏶A. 一般内容和服务许可ToyNJoy和您的订购需要将内容和服务下载并安装到您的计算机上。Valve特此授予并接受非独家许可
            和权利，将内容和服务用于个人非商业用途（除非本文或适用的订购条款明确允许商业用途）。本许可在（a）本协议或（b）包括该许
            可的订购终止时终止。内容和服务已获得许可，未经出售。您的许可证不授予内容和服务任何标题或所有权。要使用内容和服务，您必
            须具有一个ToyNJoy帐户，并且可能需要您运行ToyNJoy客户端并维护与Internet的连接。出于以下原因，在不限制系统安全性，稳定
            性和多人互操作性的前提下，ToyNJoy可能需要自动更新，预加载，创建内容和服务的新版本或以其他方式增强内容和服务，因此，使用
            内容和服务的系统要求可能会随时间而变化。您同意这种自动更新。您了解本协议（包括适用的订购条款）无权使您获得与特定订购相关
            的内容和服务的未来更新，新版本或其他增强功能，尽管Valve可以自行决定选择提供此类更新等。 。B. Beta软件许可Valve可能会在
            使该软件正式商业发行之前，不时通过ToyNJoy使您访问该软件（“ Beta软件”）。您不需要使用Beta软件，但是如果Valve提供了该软件，
            则可以根据以下条款选择使用它。Beta软件将被视为由内容和服务组成，并且所提供的Beta软件的每一项都将被视为该Beta软件的订阅，
            其中特定于Beta软件的以下规定：您使用Beta软件的权利可能会受到时间限制，并可能受其他订阅条款的约束；Valve或任何Valve附属机
            构可能会要求或要求您提供有关使用Beta软件的建议，反馈或数据，在以下第6节（用户生成的内容）下，这些内容将被视为用户生成的内
            容；除第7节（免责声明；责任限制；没有保证；在以下适用的有限保修和协议）中，您明确承认Beta软件仅出于测试和改进目的而发布，
            特别是为了向Valve提供有关Beta软件的质量和可用性的反馈，因此包含错误，并非最终的，可能会造成您的计算机，数据和/或软件的不兼
            容性或损坏。如果您决定安装和/或使用Beta软件，则仅应在符合其目的的情况下使用它，即用于测试和改进目的，在任何情况下均不得在
            系统上使用，或出于Beta软件故障可能导致任何后果的目的使用。某种伤害。特别是，对于选择安装Beta软件的任何系统，都应保留完整备份。
            C。使用Valve开发人员工具的许可您的订阅可能包括访问各种可用于创建内容的Valve工具（“开发人员工具”）。一些示例包括：用于计算机
            游戏引擎版本的“ Valve”软件开发套件（“ SDK”）（称为“ Source”（“ Source Engine”））和相关的Valve Hammer编辑器，
            TheSource®Filmmaker Software，或游戏工具，通过它们您可以编辑或创建Valve游戏的衍生作品。特定的开发人员工具（例如TheSource®Filmmaker软件）
            可能会与单独的订阅条款一起分发，这些条款与本节中规定的规则不同。除非适用于使用特定开发者工具的单独订阅条款中另有规定，
            否则您可以使用开发者工具，并且您可以随意使用，复制，发布，执行，显示和分发使用开发者工具创建的任何内容，但仅限于非商业目的。
            如果您想将Source Engine SDK或其他Valve开发工具用于商业用途，请通过sourceengine@valvesoftware.com与Valve联系。
            D.在粉丝艺术中使用Valve游戏内容的许可。Valve感谢订阅者社区，他们创建了引用Valve游戏的粉丝艺术，粉丝小说和视听作品（“粉丝艺术”）。
            您可以将Valve游戏中的内容纳入粉丝艺术中。除非本节或任何订阅条款另有规定，否则您可以使用，复制，发布，执行，根据您的意愿，
            仅出于非商业目的展示和分发包含来自Valve游戏内容的粉丝艺术。如果您在任何粉丝艺术中包含任何第三方内容，则必须确保从该内容的
            所有者那里获得所有必要的权利。通过诸如ToyNJoy Workshop或ToyNJoy Subscription Marketplace等功能允许某些Valve游戏内容
            的商业使用。适用于该用途的条款在第3.D节中列出。和6.B。以下以及针对这些功能提供的任何订购条款。要查看Valve的视频政策，
            其中包含涉及使用带有Valve知识产权或由TheSource®Filmmaker Software创建的视听作品的附加条款，请单击此处：http://www.valvesoftware.com/videopolicy。
            html E.使用Valve专用服务器软件的许可您的订阅可能包含对Valve专用服务器软件的访问。如果是这样，您可以在不限数量的计算机上使用
            Valve专用服务器软件来托管Valve产品的在线多人游戏。如果您希望操作Valve专用服务器软件，您将独自负责为此类活动获得任何Internet访问，
            带宽或硬件，并将承担与使用相关的所有费用。F.内容和服务的所有权内容和服务及其任何和所有副本的所有权，所有权和知识产权均由Valve和/
            或其附属机构的许可人拥有。保留所有权利，除此处明确规定外。内容和服务受版权法，国际版权条约和公约以及其他法律的保护。
            内容和服务包含某些许可的材料，如果违反本协议，则Valve及其关联公司的许可人可以保护其权利。G.使用内容和服务的限制除非本许可协议另有规定，
            否则您不得将内容和服务用于除许可使用ToyNJoy和您的订阅以及将您的订阅进行个人，非商业用途以外的任何其他目的。协议或适用的订阅条款。
            除非本协议（包括任何订阅条款或使用规则）或适用法律（除非有这些限制）另有许可，您不得全部或部分地复制，影印，复制，复制，发布，分发，
            翻译，反向工程，从中获取源代码，进行修改，反汇编，反编译，基于或从中删除任何专有的声明或标签来创建派生作品未经Valve事先书面同意，
            不得通过内容和服务或通过ToyNJoy访问任何软件。您有权将内容和服务用于个人用途，但您无权：（i）出售，授予内容或服务的担保权益或
            以任何方式将内容和服务的复制品转让给其他方，也不得出租未经Valve事先书面同意，将内容和服务出租或许可给他人，但在本协议其他地方
            明确允许的范围内（包括任何订购条款或使用规则）；（ii）通过协议仿真，隧道化，修改或向内容和服务添加组件的方式，为内容和服务托管
            或提供对接服务，或模拟或重定向Valve在内容和服务的任何网络功能中使用的通信协议，出于任何目的（包括但不限于互联网上的网络游戏，
            利用商业或非商业游戏网络或作为内容聚合网络，网站或服务的一部分）进行的应用程序或现在已知或以后开发的任何其他技术的介绍未经
            Valve事先书面同意；或（iii）出于任何商业目的利用内容和服务或其任何部分，除非本协议其他地方（包括任何订购条款或使用规则）明确
            允许。3.帐单 付款和其他订阅ToyNJoy ToyNJoy产生的所有费用以及使用ToyNJoy Wallet进行的所有购买均应预先付款和最终付款，除非以
            下第3.I和7节所述。A.付款授权当您向Valve或其某个付款处理者提供付款信息时，您向Valve表示您是该付款相关联的卡，PIN，密钥或帐户
            的授权用户，并且您授权Valve收取您的费用信用卡或使用您选择的第三方付款处理器处理您的付款，ToyNJoy钱包资金，硬件或您产生的其他费用。
            Valve可能会要求您提供地址或其他信息，以便履行适用税法规定的义务。对于根据约定的使用期限购买的订购，如果要进行续期付款以换取继
            续使用（“定期付款订购”），则继续使用定期付款订购即表示您同意并确认Valve授权从您的信用卡中扣除（或您的ToyNJoy电子钱包（如果有资金）），
            或与任何其他适用的第三方付款处理器处理您的付款（适用于任何适用的定期付款金额）。如果您购买了任何定期付款订阅，则表示您同意立即将
            您的信用卡帐号，其到期日和/或您的帐单地址，或您的PayPal或其他付款帐号的任何更改通知Valve，并且您同意如果您的信用卡或PayPal或其
            他付款帐户过期或由于任何原因被取消，则立即通知Valve。如果您使用ToyNJoy需缴纳任何类型的使用税或营业税，那么Valve可能还会向您收取
            这些税款，以及使用规则中发布的订阅或其他费用。Valve收取的欧盟增值税（“ VAT”）税额反映了任何内容和服务，硬件或订购的价值所应缴的
            增值税。您同意不会使用IP代理或其他方法来掩饰您的居住地，无论是规避游戏内容的地理限制，以不适用于您所在地区的价格购买产品，还是用
            于任何其他目的。如果这样做，Valve可能会终止您对帐户的访问。B．与您帐户相关的费用的责任作为帐户持有人，您应对所有产生的费用（包括适用的税费）
            以及您或使用您帐户的任何人（包括您的家人或朋友）进行的所有购买负责。如果您取消帐户，Valve保留收取取消之前产生的费用，附加费或费用
            的权利。Valve允许您再次注册之前，必须清偿所有拖欠或未付款的帐户。C. ToyNJoy钱包ToyNJoy可以提供与您的帐户相关联的账户余额（“ ToyNJoy钱包”）。
            ToyNJoy Wallet既不是银行帐户，也不是任何一种付款方式。它用作购买内容和服务的预付款余额。您可以将资金存入ToyNJoy钱包中，最高金额由
            Valve，信用卡，预付卡，促销代码或ToyNJoy接受的任何其他付款方式确定。在任何二十四（24）小时内，ToyNJoy钱包中存储的总金额加上从ToyNJoy
            钱包中支出的总金额总计不得超过2,000美元或等值的您适用的本地货币-尝试除非您的活动量低于此阈值，否则超过此阈值的蒸汽钱包中的存款可能
            不会计入您的ToyNJoy钱包。阀门可能会不时更改或施加不同的ToyNJoy Wallet余额和使用限制。更改生效前六十（60）天内，将通过电子邮件通知
            您ToyNJoy钱包余额和使用限制的任何更改。更改生效后三十（30）天以上继续使用您的ToyNJoy帐户即表示您接受更改。如果您不同意更改，则唯一
            的补救方法是终止您的ToyNJoy帐户或停止使用ToyNJoy钱包。在这种情况下，Valve没有义务退还蒸汽钱包上剩余的任何积分。您可以使用ToyNJoy 
            Wallet资金购买订阅，包括通过启用ToyNJoy Wallet交易的游戏内购买以及硬件来进行购买。根据第3.I节的规定，添加至ToyNJoy Wallet的资金不
            可退款且不可转让。ToyNJoy Wallet资金不构成个人财产权，在ToyNJoy之外没有任何价值，只能用于通过ToyNJoy（包括但不限于通过ToyNJoy商店
            或ToyNJoy订阅市场中提供的游戏和其他应用程序）和硬件购买订阅和相关内容。ToyNJoy Wallet资金没有现金价值，不能兑换现金。被视为无人认领
            财产的ToyNJoy Wallet资金可能会移交给适用的机构。D.订户之间的订购交易和销售ToyNJoy可能包括一个或多个功能或站点，这些功能或站点允许订
            户与其他订户（或从其他订户）进行交易，出售或购买某些类型的订户（例如，虚拟物品的许可权）（“订阅市场”）。订阅市场的一个示例是ToyNJoy社
            区市场。通过使用或参与Subscription Marketplace，您代表其本身或作为您帐户中适用订购的任何第三方创建者或发行者的代理或被许可方授权Valve
            从您的帐户中转移这些订购以生效您进行的任何交易或销售。Valve可能会在订阅市场中收取交易或销售费用。任何费用将在交易或出售完成之前向您披露。
            如果您在Subscription Marketplace中完成交易，销售或购买，则表示您承认并同意对交易（包括销售或使用税）可能应付的税款（如有）负责，并遵守适
            用的税款法律。您在Subscription Marketplace中进行的销售收入可能会被视为您的所得税收入。您应咨询税务专家，以确定与您在任何Subscription Marketplace
            中的活动有关的应纳税额。您了解并确认，Valve可能决定停止任何Subscription Marketplace的运营，更改其收费或更改ToyNJoy Subscription Marketplace
            的条款或功能。由于无法在ToyNJoy交易市场中进行订购交易，包括由于任何订购市场的条款，功能或资格要求的终止或变更，Valve对您不承担任何责任。
            您还了解并确认订阅交易，在任何Subscription Marketplace中出售或购买的都是许可权，您在此类Subscription中没有所有权权益，并且Valve
            不承认在ToyNJoy以外进行的任何Subscription转让（包括通过法律手段进行的转让）。E.零售购买Valve可能会为零售包装产品版本或Valve产品的
            OEM版本的购买者提供或要求订购。这些版本随附的“ CD密钥”或“产品密钥”用于激活您的订阅。F. ToyNJoy授权经销商您可以通过Valve的授权经销商
            购买订购。购买时随附的“产品密钥”将用于激活您的订阅。如果您从Valve的授权经销商处购买订购，则表示您同意将有关产品密钥的所有问题直接发送
            给该经销商。G.免费订阅在某些情况下，Valve可能会为某些服务，软件和内容提供免费订阅。与所有订阅一样，即使Valve提供免费订阅，您也始终要
            承担使用ToyNJoy时可能产生的任何互联网服务提供商，电话和其他连接费用。H.第三方站点ToyNJoy可能会提供到其他第三方站点的链接。这些网站中
            的一些可能会收取单独的费用，不包括在您可能要支付给Valve的任何订购或其他费用之内，并且是这些费用之外的费用。ToyNJoy可能还会提供对第三
            方供应商的访问权，这些第三方供应商会提供内容，ToyNJoy或互联网上的商品和/或服务。您与这些第三方进行交易时所产生的任何其他费用或义务均
            由您负责。Valve不对任何第三方站点做任何明示或暗示的陈述或保证。特别是，Valve不保证或担保通过第三方供应商提供的任何服务或订阅都不会更改，
            被暂停或终止。I.退款和取款权在不损害您可能拥有的任何法定权利的情况下，您可以根据Valve的退款政策http://store.ToyNJoypowered.com/ToyNJoy_refunds/的条款要求退款。
            对于欧盟消费者：欧盟法律规定了撤销某些实物商品和数字内容购买合同的法定权利。您可以在此页面上找到有关您的法定撤销权的范围以及行使方式的
            更多信息：https://support.ToyNJoypowered.com/kb_article.php?ref=8620-QYAL-4516。4.在线行为，欺诈和非法行为⏶您的在线行为和与其他
            订户的互动应遵循常识和基本礼节。他们必须特别遵守http://ToyNJoypowered.com/index.php?area=online_conduct上的《 ToyNJoy在线行为规则》。
            根据托管特定游戏或其他服务的第三方施加的使用条款，在适用于特定订阅的订阅条款中也可能会提供其他要求。ToyNJoy和“内容和服务”可能包括旨在识别软
            件或硬件过程的功能，或者在播放任何“内容和服务”的多人版本或对内容和服务进行修改时可能给玩家带来不公平竞争优势的功能（“作弊”）。您同意不会以任
            何方式创建秘籍或协助第三方创建或使用秘籍。您同意不会直接或间接禁用，规避或以其他方式干扰旨在防止或报告欺诈行为的软件的运行。您承认并同意，如
            果您将Cheats与ToyNJoy或“内容和服务”结合使用，则Valve或任何在线多人游戏主机可能拒绝允许您参加某些在线多人游戏。此外，您承认并同意在线多人主
            机可以向Valve报告您对作弊行为的使用，并且Valve可以将您对作弊行为的使用历史传达给其他在线多人主机。Valve可能会因任何非法，构成欺诈或以其他方
            式负面影响其他订户享用ToyNJoy的行为而终止您的帐户或特定的订阅。您确认，在终止您的订阅和/或帐户之前，无需Valve发出通知。您不得使用秘籍，自动
            化软件（机器人），mod，hacks，或任何其他未经授权的第三方软件来修改或自动化任何Subscription Marketplace流程。5.第三方内容⏶对于非Valve创作
            的所有订购，内容和服务，Valve不会筛选ToyNJoy或通过其他来源提供的此类第三方内容。Valve对此类第三方内容不承担任何责任。某些第三方应用程序软件
            可以被企业用于商业目的-但是，您只能通过ToyNJoy购买此类软件，以供私人使用。6.用户生成的内容⏶A. 一般规定ToyNJoy提供了界面和工具，使您能够自
            行生成内容并将其提供给其他用户和/或Valve使用。“用户生成的内容”是指您通过使用ToyNJoy的多用户功能提供给其他用户的任何内容，或通过使用内容和服
            务或其他方式提供给Valve或其附属公司的任何内容。当您将内容上传到ToyNJoy以使其对其他用户和/或Valve可用时，您授予Valve及其附属公司全球非排他性
            的使用，复制，修改，创建衍生作品，从其分发，传输，转码的权利。 ，翻译，广播，以其他方式交流以及公开展示和公开表演您的用户生成的内容，您的用户
            生成内容的衍生作品以及其衍生作品，用于运营，分发，并入ToyNJoy服务，ToyNJoy游戏或其他ToyNJoy产品（包括订阅）的一部分和促销。由于在整个知识产
            权期间内将​​内容上载到ToyNJoy上，因此该阀门被授予Valve。如果Valve违反许可并且在收到您的通知后十四（14）天内仍未解决此类违反，该通知已通过此隐
            私政策页面上注明的适用Valve地址发送给Valve法律部门的注意，则该终止。终止许可不会影响Valve授予的任何分许可的权利。Valve是Valve从您的用户生成
            的内容创建的衍生作品的唯一所有者，因此有权授予这些衍生作品的许可。如果您使用Valve云存储，则授予我们许可，以将您的信息存储为该服务的一部分。
            Valve可能会限制您可以使用的存储量。如果您向Valve提供有关ToyNJoy，内容和服务或任何Valve产品，硬件或服务的任何反馈或建议，Valve可以自由使用其
            选择的反馈或建议，而无需承担任何责任。B.上载到ToyNJoy Workshop的内容ToyNJoy上的某些游戏或应用程序（“启用Workshop的应用程序”）使您可以基于或
            使用启用了Workshop的应用程序创建用户生成的内容，并将该用户生成的内容（“ Workshop贡献”）提交到一个或多个ToyNJoy Workshop网页。ToyNJoy社区可
            以查看Workshop Contribution，并且对于某些类别的Workshop Contribution，用户也许可以与Workshop Contribution进行交互，下载或购买。
            在某些情况下，Valve或第三方开发人员可以考虑将Workshop Workshop贡献合并到游戏或Subscription Marketplace中。您了解并同意，Valve没有义务使用，
            分发或继续分发任何Workshop贡献的副本，并且保留出于任何原因限制或删除Workshop贡献的权利，但没有义务。特定于Workshop的应用程序或Workshop网页可
            能包含特殊条款（“ App特定条款”），以补充或更改本节中列出的条款。特别是，在有偿分配研讨会贡献金的情况下，“应用专用条款”将说明如何分享收益。
            除非“应用专用条款”（如果有）中另有规定，否则以下一般规则适用于工作室贡献。Workshop贡献是订阅，因此，您同意，收到您的Studio贡献分配的任何订阅者
            将具有与本协议中针对任何其他订阅所规定的使用Studio贡献的相同权利（并受到相同的限制）。尽管有6.A.节所述的许可，Valve仅在以下情况下有权修改或创
            建来自您的Workshop贡献的衍生作品：（a）Valve可能需要进行必要的修改，以使您的贡献与ToyNJoy和Workshop的功能或用户界面兼容，并且（b）Valve或适
            用的开发人员可以视其为增强游戏玩法而认为必要或合乎需要的，可以对应用贡献内接受的工作室贡献进行修改。您可以自行决定从适用的Workshop页面中删除Workshop Contribution。
            如果您这样做，Valve将不再有权使用，分发，传输，交流，公开展示或公开执行“工作室贡献”，除非（a）Valve可以继续为在游戏中分发或允许在游戏中使用的任
            何形式的工作室贡献活动行使这些权利，并且（b）您的移除不会影响这些权利拥有访问工作坊贡献副本的任何订阅者的数量。除非“应用专用条款”中另有规定，
            否则您同意Valve对您的工作室贡献的考虑是您的全额赔偿，并且您无权获得与Valve和其他订户授予的权利有关的任何其他权利或赔偿。C.促销和认可如果您使
            用ToyNJoy服务（例如ToyNJoy策展人名单或ToyNJoy广播服务）来促销或认可产品，服务或活动，以换取第三方的任何形式的考虑（包括非金钱奖励，例如免费游戏），
            您必须向受众明确说明这种考虑的来源。D.陈述和保证您声明并向我们保证您对所有用户生成的内容均具有足够的权利，以授予Valve和其他受影响方上述A.和B.中
            所述的许可或适用于适用于Workshop-Enabled的任何许可条款应用程序或工作室页面。这包括但不限于受用户生成的内容影响或包含在其中的任何种类的知识产权
            或其他专有权或个人权利。特别是在讲习班捐款方面，您声明并保证，研讨会贡献最初是由您创建的（或者关于您以外的其他人，您和其他贡献者为之贡献的研讨会
            贡献，并且在这种情况下，您有权提交此类研讨会贡献代表其他贡献者）。您还声明并保证用户生成的内容，您提交的内容以及您对该内容的权利授予均不违反任何
            适用的合同，法律或法规。7.免责声明；责任范围；没有保证；有限担保和协议⏶本第7条不适用于欧盟用户。对于澳大利亚用户，此第7条不排除在外，限制或修改
            不能被排除，限制或修改的任何保证，权利或补救措施，包括澳大利亚消费者法（ACL）所赋予的保证。在ACL下，商品附带保证书，其中包括保证商品质量合格的保
            证书。如果没有此保证，则您可以采取补救措施（其中可能包括已修理或更换的商品或退款）。如果无法提供维修或更换或出现重大故障，则您将被要求退款。对于
            新西兰用户，本第7条不排除，限制或修改任何不被排除，限制或修改的权利或救济，包括1993年《新西兰消费者担保法》所赋予的权利或救济。根据此法案，其中
            包括保证商品和服务的质量可接受的保证。如果不履行此保证，则表明您有权对软件进行补救（其中可能包括维修，更换或退款）。如果无法提供补救措施或主要特征
            失败，则该法案规定退款。在获得订阅之前，您应该查阅ToyNJoy上提供的产品信息，包括订阅说明，最低技术要求和用户评论。A.对适用法律，阀门及其附属机构和
            服务提供者所允许的最大范围的免责声明明确声明（I）对蒸汽，内容和服务以及订购的任何保证，以及（II）与蒸汽有关的任何常见法律责任，内容和服务以及订阅，
            其中包括缺乏疏忽和缺乏工作努力的义务。蒸汽，内容和服务，订阅以及与之相关的任何连接信息均以“原样”和“现有”依据，“所有故障”提供，并且不作任何形式的明
            示或暗示的担保，包括，但不限于对适销性，特定用途的适用性或非侵权性的默示担保。在美国统一商业法典第2-312条中和/或在任何其他可比较的州法规中明确规定的
            与侵权相关的任何担保。此外，也没有所有权的保证，不干扰您的娱乐或与蒸汽，内容和服务有关的授权，订阅或由此获得的信息。对于美国统一商业代码第2-312条可能
            提供的有关侵权的任何保证，均被明确拒绝。B.对于适用的阀门，其阀门的许可人，其附属机构，或任何阀门的服务提供者，无论是由使用法律造成的任何损失或损害，
            均应以适用法律允许的最大责任为限。要使用蒸汽，您的帐户，您的订购以及内容和服务，包括但不限于，商誉损失，停工，计算机故障或故障，或任何及所有其他商业
            损害或损失。在任何情况下，VALVE都不对任何间接，偶发，继发性，特殊性，惩罚性或排他性损害，或因蒸汽，内容和服务，订购以及与之相关的任何可用信息，或因
            使用这些内容和服务而延误或无法使用而引起的或与之相关的任何其他损害任何信息，即使在阀门或其附属机构发生故障，侵权（包括过失），严格责任或违反阀门保修
            的情况下，甚至已被告知可能发生此类损坏。即使没有任何补救措施可提供足够的建议，这些限制和责任排除也适用。由于某些州或司法管辖区不允许在某些州或司法管辖
            区对每个阀，其许可方，继发性或偶发性损害进行排除或限制责任，其子公司的责任应限于法律允许的最大范围内。C.对于适用法律或阀门及其附属机构的连续性，无差错，
            无病毒或安全的操作以及对蒸汽，内容和服务，您的帐户和/或您的使用的保证，均不担保适用法律所允许的最大范围。 ）或与之相关的任何信息。D.从阀门购买的有限担
            保和协议某些有限保修和协议，或[取决于您所在的位置，是法定担保]的特定硬件，在此进行了详细说明。8.本协议的修订⏶请注意：如果您是居住在德国的消费者，适用
            于您的第8节的其他版本也可以在此处找到。A.相互修订在您明确同意Valve提出的变更之后，可以随时相互修订本协议。B.单方面修改此外，Valve可以随时自行决定单方
            面修改本协议（包括任何订购条款或使用规则）。在这种情况下，Valve会在修改生效日期至少30（30）天之前通过电子邮件将您对本协议的任何修改通知您。您可以随时
            在http://www.ToyNJoypowered.com/上查看该协议。如果您未在修改生效日期之前取消帐户，则表示您接受修改后的条款。如果您不同意本协议的修订或任何条款，则唯
            一的补救方法是取消您的帐户或停止使用受影响的订阅。在取消您的帐户或停止使用任何订阅之前，Valve没有义务退还您帐户中可能产生的任何费用，在这种情况下，Valve
            也没有义务按比例分配费用。9.条款和终止⏶A.条款本协议的条款（“条款”）自您首次表示接受这些条款之日开始，并将一直有效，直到根据本协议另行终止为止。
            B.由您终止您可以随时取消您的帐户。您可以随时停止使用订阅，或者，如果您选择，可以请求Valve终止对订阅的访问。但是，订阅不可转让，即使您终止了对特定游戏
            或应用程序的订阅访问，即使订阅是在零售商店中获得的，原始激活密钥也将无法注册到任何其他帐户。 。不能单独终止对作为套装或套装的一部分购买的订购的访问，
            对套装中一个游戏的访问的终止将导致对套装中购买的所有游戏的访问的终止。您取消帐户，停止使用任何订阅或终止访问订阅的请求均不会使您获得退款，包括任何订
            阅费用。Valve保留权利在取消您的帐户或终止您对特定订阅的访问之前收取费用，附加费或费用。此外，在取消之前，您应对第三方供应商或内容提供商产生的任何费
            用负责。C. Valve终止如果（a）Valve停止向通常位于类似位置的订户提供此类订阅，或（b）您违反本协议的任何条款，Valve可以随时取消您的帐户或任何特定的订阅。
            包括任何订阅条款或使用规则）。如果您的帐户或特定订阅因违反本协议或不当或非法活动而被终止或取消，则不予退款，包括任何订阅费或ToyNJoy钱包中任何未使用的资金，
            将被授予。D.术语的保留第2.C.，2.D.，2.F.，2.G.，3.A.，3.B.，3.D.，3.H。和5-12节在本协议期满或终止后仍然有效。10.适用法律/调解/司法/律师费⏶对于欧
            盟以外的所有客户：您和Valve同意本协议应视为已在美国华盛顿州制定和执行，并且不包括华盛顿法律法律冲突原则和《国际货物销售合同公约》管辖因以下原因引起或
            与之有关的所有索赔：（i）我们之间关系的任何方面；（ii）本协议；或（iii）您使用ToyNJoy时，您的帐户或内容和服务；除了《美国联邦仲裁法》在您所在国家/地
            区的法律允许的范围内对仲裁进行管辖之外。根据下面的第11条（争议解决/具有约束力的仲裁/集体诉讼豁免），您和Valve同意，在任何法律程序中主张的任何索赔应在
            华盛顿州金县的任何州或联邦法院专门提起并维持，案件管辖权。您和Valve特此同意接受此类法院的专属管辖权。在因本协议，您使用ToyNJoy，您的帐户或内容和服务
            而引起或与之有关的任何争议中，胜诉方将有权获得律师的费用和支出（仲裁除外-参见第11.C节）。对于欧盟客户：如有与解释，执行或有效的订户协议有关的争议，将
            在任何法律诉讼之前寻求友好解决方案。您可以在http://help.ToyNJoypowered.com上投诉。如果失败，您可以在失败请求后的一年内，通过在欧洲委员会的在线争议
            解决网站上进行在线投诉来诉诸替代性争议解决程序：https://webgate.ec.europa.eu/ odr / main / index.cfm？event = main.home.chooseLanguage。如果庭
            外争议解决方案失败，则可以将争议提交主管法院。11。争议解决/约束仲裁/集体诉讼豁免⏶本第11条应在适用法律允许的最大范围内适用。特别是，如果您居住在魁北克
            省（加拿大）或欧洲联盟省，则本第11条不适用于您。使用我们的ToyNJoy支持网站https://support.ToyNJoypowered.com/可以解决大多数用户的担忧。如果Valve无
            解决您的问题，并且您与Valve之间仍然存在争议，则本节将说明双方如何同意解决该问题。A.必须仲裁除IP，未经授权使用，盗版或盗窃外的所有索偿，并且您和阀门同意
            在单独的捆绑仲裁中解决我们之间的所有争议和索赔。包括但不限于因以下原因而引起或与之有关的任何索赔：（i）我们之间关系的任何方面；（ii）本协议；或（iii）您
            对蒸汽，帐户，硬件或内容和服务的使用。无论此类索赔是基于合同，侵权，法规，欺诈，不正当竞争，陈述不当或任何其他法律理论的，它均适用，并且包括代表另一方的
            所有索赔。但是，本第11节不适用于您或Valve可能在任何具有管辖权的法院提起的以下类型的索赔或争议：（i）侵犯知识产权或其他滥用知识产权的索赔，包括寻求禁令救
            济的此类索赔；（ii）与任何涉嫌未经授权的使用，盗版或盗窃有关或由其引起的索赔。第11条并没有阻止您将您的纠纷引起任何联邦，州或地方政府机构的注意，如果法律允
            许，这些机构可以为我们寻求救济。仲裁是在中立仲裁员之前进行的程序，而不是在法官或陪审团之前进行的程序。仲裁不如在法院提起正式诉讼，而且提供的证据更为有限
            。它遵循与法院诉讼程序不同的规则，并且受到法院的非常有限的审查。如果任何一方要求，仲裁员将发布书面决定并提供理由说明。您了解自己和阀门在审判或陪审之前放弃
            了在法院提起诉讼和进行审判的权利。B．尝试非正式地解决争端首先，您和Valve同意在启动仲裁之前做出合理，真诚的努力，以非正式方式解决任何争端。打算寻求仲裁的一
            方必须首先向另一方发送书面通知，说明索赔或争议的性质和基础，并阐明所寻求的救济。如果您和Valve在收到通知后30天内未达成解决该索赔或争议的协议，则您或Valve可
            以开始仲裁。Valve的书面通知必须通过邮寄发送至：ATTN：Valve Corporation的仲裁通知，Valve Corporation，WA Box 1688，Bellevue，WA98004。C.仲裁规则和费
            用美国联邦仲裁法在您所在国家/地区的第11条中适用。法律允许。仲裁受美国仲裁协会（“ AAA”）的《消费者仲裁规则》（或《商业仲裁规则》（如果不适用消费者仲裁规则
            的话））管辖，该协议经本协议修改。有关规则，请访问http://www.adr.org。仲裁员受本协议条款的约束。AAA将负责仲裁。在美国以外，Valve将选择使用这些规则或类似
            规则的中立仲裁提供者。可以通过提交文件，通过电话或亲自在您居住的县或在其他共同商定的地点亲自进行。如果您寻求10,000美元或以下的金额，Valve同意立即退还您的
            申请费和AAA仲裁费用中的任何部分（包括仲裁员赔偿金，除非仲裁员确定您的索偿无聊或被提出骚扰。Valve同意不寻求律师的费用或成本，除非仲裁员确定您的索偿无聊或被
            提出骚扰。如果您寻求超过10,000美元且不适用AAA消费者仲裁规则，则AAA的仲裁费用（包括仲裁员补偿）将根据AAA商业仲裁规则在您和Valve之间分配。D.个人有约束力的
            仲裁只有您和阀门同意不接受或参加集体或代表诉讼，私人律师一般诉讼，举报人或集体诉讼，集体或代表仲裁，即使AAA另有规定。仲裁员仅可根据个人当事方的救济而给予裁
            决，并且仅在该当事方个人索赔的范围内给予裁定。您和Valve也同意，未经本协议所有各方和所有其他诉讼或仲裁的同意，不寻求将任何诉讼或仲裁与任何其他诉讼或仲裁合并
            。本协议不允许集体，集体或代表仲裁。法院拥有对它所做的任何主张进行裁决的专有权力。E.如果发现第11条的一部分是非法的或无法执行，会发生什么如果发现第11条（争
            端解决/约束性仲裁/集体诉讼豁免）的任何部分是非法或无法执行，其余部分将继续有效（具有仲裁裁决）在任何法院程序开始之前签发），除非如果部分不合法或无法执行的
            裁定允许集体，集体或代表仲裁，则第11条的全部内容将无法执行，并且将在法院解决索赔或争议。12.杂项⏶除非本协议另有明确规定，否则如果本协议的任何规定应由仲裁员
            ，法院或其他有管辖权的法庭裁定为非法或不可执行，则该规定将强制执行为在本协议允许的最大范围内，其余部分应保持完全的效力。第11.E节。规定第11条（争议解决/约束
            性仲裁/集体诉讼豁免）的某些部分被认定为非法或不可执行。本协议，包括任何订购条款，使用规则，Valve隐私政策和Valve Hardware有限保修政策构成并包含了各方之间
            就本协议主题的全部协议，并取代了之前的任何口头或书面协议。您同意，本协议无意授予，也不授予本协议各方以外的任何人任何权利或救济。Valve的义务受现行法律和法律
            程序的约束，并且尽管有任何相反的规定，Valve仍可遵守执法或法规要求或要求。您同意遵守所有适用的进出口法律和法规。您同意不出口内容和服务或硬件，也不允许任何受
            到恐怖分子支持的国家的个人使用您的帐户，这些国家在出口时受到美国出口管理局限制的加密出口。您声明并保证您不位于任何此类违禁国家/地区，也不受该国家/地区的居
            民约束。本协议的最新更新时间为2019年4月30日（“修订日期”）。如果您在修订日期之前是订户，则根据以上第8节生效之日，它将用Valve或Valve SARL替换您现有的协议。
            受任何此类违禁国家的控制或国民或居民的控制。本协议的最新更新时间为2019年4月30日（“修订日期”）。如果您在修订日期之前是订户，则根据以上第8节生效之日，它将用
            Valve或Valve SARL替换您现有的协议。受任何此类违禁国家的控制或国民或居民的控制。本协议的最新更新时间为2019年4月30日（“修订日期”）。如果您在修订日期之前是
            订户，则根据以上第8节生效之日，它将用Valve或Valve SARL替换您现有的协议。`,
            user: {
                username: '',
                password: '',
                email: ''
            },
            confirmPassword: '',
            verificationCode: '',
            systemVerificationCode: '',
            agreement: false,
            message: '',
            error: ''
        }
    },
    methods: {
        //#region 获取验证码
        getVerificationCode() {
            if (this.isEmail(this.user.email)) {
                this.myAxios({
                    url: 'system/getVerificationCode',
                    params: { email: this.user.email },
                    success: (response) => {
                        if (response.data) {
                            this.error = '';
                            this.systemVerificationCode = response.data;
                        }
                        else
                            this.error = '获取验证码失败';
                    }
                });
            }
            else
                this.error = '邮箱格式不正确';
        },
        //#endregion

        //#region 检查输入项
        checking() {
            for (let val in this.user) {
                if (!this.user[val])
                    return '请确认信息填写完整';
            }
            if (this.confirmPassword != this.user.password)
                return '两次密码输入不一致';
            if (!this.isEmail(this.user.email))
                return '邮箱格式不正确';
            if (this.systemVerificationCode == '' || this.verificationCode.toLowerCase() != this.systemVerificationCode.toLowerCase())
                return '验证码错误';
            if (!this.agreement)
                return '请阅读并同意协议';
        },
        //#endregion

        submit() {
            this.error = this.checking();
            if (!this.error) {
                this.myAxios({
                    method: 'post',
                    url: 'user/add',
                    data: this.user,
                    success: (response) => {
                        if (response.data.indexOf('成功') > -1) {
                            this.message = response.data;
                            setTimeout(() => {
                                this.$router.go(-1);
                            }, 1000);
                        }
                        else
                            this.error = response.data;
                    }
                });
            }
        }
    },
    watch: {
        'user.email'() {
            this.systemVerificationCode = '';
        }
    }
}
</script>

<style scoped>
#registerBox {
    width: 50vw;
    height: 28vw;
    /* margin: 0 auto; */
    vertical-align: middle;
    overflow: hidden;

    position: absolute;
    top: 7.5vw;
    left: 25vw;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 5px 2px #ccc;
}

.title {
    height: 3vw;
    line-height: 3vw;
    color: #555555;
    box-shadow: 0 0 3px 1px rgba(100, 100, 100, 0.5);
    padding-bottom: 50px;
    padding-left: 1vw;
}

.title>span {
    font-size: 1.8vw;
}

.title>label {
    font-size: 1vw;
    color: #f26c6c;
}

.content {
    padding: 0 20px;
}

.content>table {
    width: 24vw;
    margin-bottom: 1vw;
    border-right: #cccccc solid 0.1vw;
    font-size: 1vw;
    color: #656565;
    float: left;
}

.content th {
    text-align: left;
    font-weight: 500;
}

.content>table input {
    height: 1.8vw;
    width: 14.8vw;
    border: none;
    border-radius: 0.3vw;
    box-shadow: 0 0 2px 1px rgba(100, 100, 100, 0.5);
    margin: 1vw 0;
    outline: none;
    font-size: 0.85vw;
    color: #858585;
    padding: 0 0.6vw;
    background-color: rgba(250, 250, 250, 0.5);
    vertical-align: middle;
}

.content>table .i2 {
    width: 10vw;
    margin-right: 0.3vw;
}

.content>table .i3 {
    width: 4.5vw;
    cursor: pointer;
    background-color: rgba(250, 250, 250, 0.8);
}

.content button {
    height: 2.5vw;
    width: 22vw;
    border: none;
    border-radius: 0.3vw;
    margin: 1vw auto;
    font-size: 1.1vw;
    letter-spacing: 0.3vw;
    color: #eeeeee;
    background-color: rgba(121, 153, 5, 1);
    cursor: pointer;
}

.content>div {
    height: 22vw;
    width: 21vw;
    position: absolute;
    top: 4.5vw;
    left: 27.5vw;
    border-radius: 0.2vw;
    box-shadow: 0 0 2px 1px rgba(100, 100, 100, 0.5);
    overflow: hidden;
    color: #656565;
    background-color: rgba(250, 250, 250, 0.5);
}

.content>div>p {
    /* height: 1.2vw; */
    vertical-align: middle;
    padding: 0.5vw 0.8vw;
    box-shadow: 0 0 2px 1px rgba(100, 100, 100, 0.5);
    font-size: 0.9vw;
}

.content>div>p>input {
    height: 1vw;
    width: 1vw;
    vertical-align: middle;
    cursor: pointer;
}

.content>div>.content {
    width: 20vw;
    height: 18.5vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 0.5vw;
    padding-left: 1vw;
}
</style>