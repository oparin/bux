<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 4:46 PM
 */

namespace Bux\OfficeBundle\Form\Type\Advertise;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class AutoSerfCreditsFormType
 *
 * @package Bux\OfficeBundle\Form\Type\Advertise
 */
class AutoSerfCreditsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('packages', 'entity', array(
                'class'         => 'Bux\Admin\AdvertisementsBundle\Entity\AutoSerfPackages',
                'property'      => 'credits',
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'auto_serf_credits_form_type';
    }
}