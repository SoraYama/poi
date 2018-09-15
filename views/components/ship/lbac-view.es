import React from 'react'
import { connect } from 'react-redux'
import { Badge, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { createSelector } from 'reselect'
import { getHpStyle, getTyku } from 'views/utils/game-utils'
import { LandbaseSlotitems } from './slotitems'
import { landbaseSelectorFactory, landbaseEquipDataSelectorFactory } from 'views/utils/selectors'
import { translate } from 'react-i18next'
import { Avatar } from 'views/components/etc/avatar'
import classNames from 'classnames'
import { get } from 'lodash'

export const SquardRow = translate(['main'])(connect((state, { squardId }) =>
  createSelector([
    landbaseSelectorFactory(squardId),
    landbaseEquipDataSelectorFactory(squardId),
  ], (landbase, equipsData) => ({
    landbase,
    equipsData,
    squardId,
  }))
)(({landbase, equipsData, squardId, t, enableAvatar, compact}) => {
  let { api_action_kind, api_distance, api_name, api_nowhp, api_maxhp } = landbase
  api_nowhp = api_nowhp || 200
  api_maxhp = api_maxhp || 200
  const tyku = getTyku([equipsData], api_action_kind)
  const hpPercentage = api_nowhp / api_maxhp * 100
  const statuslabel = (() => {
    switch (api_action_kind) {
    // 0=待機, 1=出撃, 2=防空, 3=退避, 4=休息
    case 0:
      return <Badge variant='default'>{t('main:Standby')}</Badge>
    case 1:
      return <Badge variant='danger'>{t('main:Sortie')}</Badge>
    case 2:
      return <Badge variant='warning'>{t('main:Defense')}</Badge>
    case 3:
      return <Badge variant='primary'>{t('main:Retreat')}</Badge>
    case 4:
      return <Badge variant='success'>{t('main:Rest')}</Badge>
    }
  })()
  const hideShipName = enableAvatar && compact
  const lbacInfoClass = classNames("ship-info", {
    "ship-avatar-padding": enableAvatar,
    "ship-info-show": !hideShipName,
    "ship-info-hidden": hideShipName,
  })
  return (
    <div className="ship-item">
      { enableAvatar && !!get(equipsData, '0.0.api_slotitem_id') && <Avatar type='equip' mstId={get(equipsData, '0.0.api_slotitem_id')} height={54} /> }
      <OverlayTrigger placement='top' overlay={
        hideShipName ? (
          <Tooltip id={`lbac-info-${squardId}`}>
            <div className="ship-tooltip-info">
              <div>
                {api_name}
              </div>
              <div>
                {t('main:Range')}: {api_distance}
              </div>
              <div>
                {t('main:Fighter Power')}: {(tyku.max === tyku.min) ? tyku.min : tyku.min + ' ~ ' + tyku.max}
              </div>
            </div>
          </Tooltip>
        ) : <span />
      }>
        <div className={lbacInfoClass}>
          {
            !hideShipName && (
              <>
                <span className="ship-name">
                  {api_name}
                </span>
                <div className="ship-exp">
                  <span className='ship-lv'>
                    {t('main:Range')}: {api_distance}
                  </span>
                  <br />
                  <span className="ship-lv">
                    {t('main:Fighter Power')}: {(tyku.max === tyku.min) ? tyku.min : tyku.min + ' ~ ' + tyku.max}
                  </span>
                </div>
              </>
            )
          }
        </div>
      </OverlayTrigger>
      <div className="ship-stat landbase-stat">
        <div className="div-row">
          <span className="ship-hp">
            {api_nowhp} / {api_maxhp}
          </span>
          <div className="lbac-status-label">
            {statuslabel}
          </div>
        </div>
        <span className="hp-progress top-space">
          <ProgressBar variant={getHpStyle(hpPercentage)}
            now={hpPercentage} />
        </span>
      </div>
      <div className="ship-slot">
        <LandbaseSlotitems landbaseId={squardId} isMini={false} />
      </div>
    </div>
  )
}))
